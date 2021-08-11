import React from 'react'

import { AppErrorStateType } from './error'

export type PayloadStateType = [
  OktaApp[],
  React.Dispatch<React.SetStateAction<OktaApp[]>>
]

export type OktaApp = {
  id?: string
  label?: string
  linkUrl?: string
  logoUrl?: string
  appName?: string
  appInstanceId?: string
  appAssignmentId?: string
  credentialsSetup?: boolean
  hidden?: boolean
  sortOrder?: number
}

const alphaSort = (a: OktaApp, b: OktaApp) => {
  let x = a.label
  let y = b.label

  if (typeof x == 'string') {
    x = ('' + x).toLowerCase()
  }
  if (typeof y == 'string') {
    y = ('' + y).toLowerCase()
  }

  return x < y ? -1 : x > y ? 1 : 0
}

export const requestSync = async (): Promise<OktaApp[]> => {
  return new Promise<OktaApp[]>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: 'apiquery' }, (response) => {
        let payload: OktaApp[]
        try {
          payload = JSON.parse(response)
          payload.sort(alphaSort)
        } catch (e) {
          reject(e)
        } finally {
          resolve(payload)
        }
      })
    })
  })
}

export const trySync = (
  errorState: AppErrorStateType,
  payloadState: PayloadStateType
): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [payload, setPayload] = payloadState
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [getError, setError] = errorState
  let apps: OktaApp[] = null
  requestSync()
    .then((_apps) => {
      apps = _apps
      setPayload(apps)
      setError(null)
    })
    .catch((e) => {
      setError({ error: 'sync', details: e })
    })
    .finally(() => {
      if (apps && apps.length === 0) {
        setError({ error: 'apps' })
      } else if (apps === null) {
        setError({ error: 'sync' })
      }
    })
}
