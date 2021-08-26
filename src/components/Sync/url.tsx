import { useToast } from '@/components/Toast/ToastProvider'
import { useAppSelector, useAppDispatch } from '@/state/index'
import { setOktaUrl } from '@/state/ui'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import cx from 'classnames'

import * as React from 'react'

import 'whatwg-fetch'

export const OktaUrl = () => {
  const dispatch = useAppDispatch()
  const urlStatus = useAppSelector(({ ui }) => ui.oktaUrl)
  const urlRef = React.useRef<HTMLInputElement>(null)
  const { addToast } = useToast()

  React.useEffect(() => {
    if (urlStatus.url) {
      urlRef.current.value = urlStatus.url
      verifyOktaConnection()
        .then(() => {
          dispatch(setOktaUrl({ key: 'good', value: true }))
        })
        .catch(e => {
          dispatch(setOktaUrl({ key: 'good', value: false }))
          addToast(e)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlStatus.url])

  const verifyOktaConnection = async () => {
    return new Promise<void>((resolve, reject) => {
      try {
        fetch('https://' + urlStatus.url + '/api/v1/users/me/appLinks')
          .then(response => {
            if (response.status === 404) {
              addToast('Okta API not detected. Check the URL for typos')
              return
            } else if (response.status >= 300) {
              reject('Error accessing Okta API: ' + response.statusText)
              return
            } else {
              return response.json()
            }
          })
          .then(foo => {
            if (foo.errorCode && foo.errorSummary) {
              if (foo.errorCode === 'E0000005') {
                reject('You need to sign-in to Okta first.')
              } else {
                reject(foo.errorSummary)
                return
              }
            } else {
              resolve()
            }
          })
          .catch(() => {
            reject("Couldn't connect to domain. Check the URL for typos")
            return
          })
      } catch (reason) {
        reject("Couldn't connect to domain. Check the URL for typos")
      }
    })
  }

  React.useEffect(() => {
    chrome.storage.sync.get(null, data => {
      if (data.oktaUrl) {
        dispatch(setOktaUrl({ key: 'url', value: data.oktaUrl }))
      }
    })
  }, [dispatch])

  const doSave = () => {
    if (urlRef) {
      dispatch(setOktaUrl({ key: 'url', value: urlRef.current.value }))
      chrome.storage.sync.set({
        oktaUrl: urlRef.current.value,
      })
    }
  }
  return (
    <section className="px-6 pt-10 pb-6 bg-gray-200">
      <p className="text-gray-500">Okta URL</p>
      <div className="flex mt-1 rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {urlStatus.good === true && (
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            )}
            {urlStatus.good === false && (
              <XCircleIcon className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className="absolute inset-y-0 flex items-center pl-4 text-sm text-gray-500 pointer-events-none left-6">
            https://
          </div>
          <input
            type="url"
            onKeyUp={e => {
              if (e.key === 'Enter') {
                doSave()
              }
            }}
            ref={urlRef}
            className={cx(
              'block w-full pl-21 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm',
              {
                'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500':
                  urlStatus.good === false,
              }
            )}
            placeholder="https://acme.okta.com"
          />
        </div>
        <button
          type="button"
          className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          onClick={doSave}>
          Save
        </button>
      </div>
      {urlStatus.good === false && (
        <p className="mt-2 text-sm text-red-600">
          Not connected to an Okta instance.
        </p>
      )}
    </section>
  )
}

export default OktaUrl
