import {
  useGetOktaAppsQuery,
  useGetRulesQuery,
  useUpdateRuleByUrlMutation,
} from '@/state/data'

import React from 'react'

import { EditableStatus, useEditable } from '@dcwither/react-editable'

import { useAppDispatch, useAppSelector } from '@/state/index'

import { setUI } from '@/state/ui'
import Drawer from '@/components/Drawer'
import { useToast } from '@/components/Toast/ToastProvider'

const SyncSheet = () => {
  const { data } = useGetOktaAppsQuery()
  const { data: rules } = useGetRulesQuery()
  const [updateAppShortcode] = useUpdateRuleByUrlMutation()

  const isShowing = useAppSelector(({ ui }) => ui)
  const dispatch = useAppDispatch()

  const closeSheet = () =>
    dispatch(setUI({ uiElement: 'syncSheet', value: false }))
  const { addToast } = useToast()

  const EditableCell = ({ appId, field, value: currentValue, ...props }) => {
    const { status, value, onCancel, onChange, onCommit } = useEditable({
      value: currentValue,
      onCommit: async (message, string) => {
        return new Promise((resolve, reject) => {
          updateAppShortcode({
            appId,
            rule: {
              url: message,
              shortCode: string,
            },
          })
            .unwrap()
            .catch((error) => {
              addToast(error)
              reject(error)
            })
        })
      },
    })

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onCommit(field)
      } else if (e.key == 'Esc') {
        onCancel()
      }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value)
    }

    return (
      <input
        type="text"
        className="block w-full text-xs text-gray-700 border-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        disabled={status === EditableStatus.COMMITTING}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        {...props}
      />
    )
  }

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

  return (
    <Drawer show={isShowing.syncSheet} onClose={closeSheet}>
      <div>
        <div className="flex mt-1 rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <input
              type="text"
              name="email"
              id="email"
              className="block w-full pl-10 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
            </svg>
            <span>Sort</span>
          </button>
        </div>
      </div>
      {data && (
        <table className="divide-y divide-gray-200">
          <thead>
            <tr>
              {cols.map((header) => (
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
                (rule) => rule.url === row.linkUrl
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
                      appId={row.id}
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

  // return (
  //   <Drawer show={isShowing.syncSheet} close={closeSheet}>
  //     {data && (
  //       <CommonTable isLoading={rulesAreLoading} data={data}>
  //         <TableBuilderColumn
  //           header="Shortcut"
  //           overrides={{ TableHeadCell: { style: { width: '300px' } } }}>
  //           {(row: OktaApp) => <span>{row.label}</span>}
  //         </TableBuilderColumn>
  //         <TableBuilderColumn
  //           header="URL"
  //           overrides={{ TableHeadCell: { style: { width: '75px' } } }}>
  //           {(row: OktaApp) => {
  //             const appAssociation = rules.find(
  //               (rule) => rule.url === row.linkUrl
  //             )
  //             if (row.label === 'Smartsheet') {
  //               console.log(row, appAssociation)
  //             }
  //             return (
  //               <EditableCell
  //                 appId={row.id}
  //                 id={row.id}
  //                 field={row.linkUrl}
  //                 placeholder="No URL"
  //                 value={appAssociation && appAssociation.shortCode}
  //               />
  //             )
  //           }}
  //         </TableBuilderColumn>
  //         <TableBuilderColumn
  //           overrides={{ TableHeadCell: { style: { width: '35px' } } }}>
  //           {(row: OktaApp) => (
  //             <Button
  //               // onClick={() => deleteRule(row.id)}
  //               kind={KIND.secondary}
  //               size={SIZE.compact}
  //               shape={SHAPE.pill}>
  //               <Delete />
  //             </Button>
  //           )}
  //         </TableBuilderColumn>
  //       </CommonTable>
  //     )}
  //   </Drawer>
  // )
}

export default SyncSheet
