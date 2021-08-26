import {
  useGetRulesQuery,
  useLazyGetOktaAppsQuery,
  useUpdateRuleByUrlMutation,
} from '@/state/data'

import React from 'react'

import { useAppDispatch, useAppSelector } from '@/state/index'

import { setUI } from '@/state/ui'
import Drawer from '@/components/Drawer'

import OktaUrl from '@/components/Sync/url'
import { NoConnection } from '@/components/Sync/utils'
import EditableCell from '@/components/Table/EditableCell'

const SyncSheet = () => {
  const isShowing = useAppSelector(({ ui }) => ui)
  const dispatch = useAppDispatch()

  const [trigger, result] = useLazyGetOktaAppsQuery()
  const { data: rules } = useGetRulesQuery()

  React.useEffect(() => {
    if (isShowing.oktaUrl.url) {
      trigger({ url: isShowing.oktaUrl.url })
    }
  }, [trigger, isShowing.oktaUrl.url])

  const { data } = result

  const closeSheet = () =>
    dispatch(setUI({ uiElement: 'syncSheet', value: false }))

  const cols = [
    {
      id: 'oktaApp',
      title: 'App',
      width: '24',
    },
    {
      id: 'url',
      title: 'URL',
      width: '10',
    },
  ]
  const [updateExistingRule] = useUpdateRuleByUrlMutation()
  const submitFunction = ({ id, key, value }) => {
    return updateExistingRule({
      appId: id,
      rule: {
        shortCode: value,
        url: key,
      },
    })
  }

  return (
    <Drawer show={isShowing.syncSheet} onClose={closeSheet}>
      <OktaUrl />
      {isShowing.oktaUrl.good === false && <NoConnection />}
      {data && (
        <table className="m-6 divide-y divide-gray-200">
          <thead>
            <tr>
              {cols.map(header => (
                <th
                  key={'th_' + header.id}
                  scope="col"
                  style={{
                    width: header.width + 'rem',
                  }}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const existingRuleForApp = rules.find(
                rule => rule.url === row.linkUrl
              )

              const appAssociation = existingRuleForApp
                ? existingRuleForApp.shortCode
                : ''

              return (
                <tr key={'tr_' + row.id + '_' + index}>
                  <td className="flex items-center px-4 py-2">
                    <span
                      className="inline-block w-12 h-6 mr-2 bg-center bg-no-repeat bg-contain"
                      style={{ backgroundImage: "url('" + row.logoUrl + "')" }}
                    />
                    {row.label}
                  </td>
                  <td className="px-4 py-2">
                    <EditableCell
                      submitFunction={submitFunction}
                      id={row.id}
                      field={row.linkUrl}
                      placeholder="No URL"
                      value={appAssociation}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </Drawer>
  )
}

export default SyncSheet
