import {
  useGetOktaAppsQuery,
  useGetRulesQuery,
  useUpdateRuleByUrlMutation,
} from '@/state/data'
import { Drawer } from 'baseui/drawer'
import React from 'react'

import { SIZE } from 'baseui/input'
import { TableBuilderColumn } from 'baseui/table-semantic'

import { EditableStatus, useEditable } from '@dcwither/react-editable'

import { Button, KIND, SHAPE } from 'baseui/button'
import { Delete } from 'baseui/icon'
import { useAppDispatch, useAppSelector } from '@/state/index'
import CommonTable from '../../styled/table'

import { CommonInput } from '../../styled/input'
import { setUI } from '@/state/ui'

const SyncSheet = () => {
  const { data, isLoading: appsAreLoading } = useGetOktaAppsQuery()
  const { data: rulesData, isLoading: rulesAreLoading } = useGetRulesQuery()
  const [updateAppShortcode] = useUpdateRuleByUrlMutation()
  const isShowing = useAppSelector(({ ui }) => ui)
  const dispatch = useAppDispatch()

  const closeSheet = () =>
    dispatch(setUI({ uiElement: 'syncSheet', value: false }))

  React.useEffect(() => {
    console.log('Apps:', appsAreLoading)
    console.log('Rules:', rulesAreLoading)
  }, [appsAreLoading, rulesAreLoading])

  const EditableCell = ({ id, field, value: currentValue, ...props }) => {
    const { value, onCancel, onChange, onCommit } = useEditable({
      value: currentValue,
      onCommit: (message, string) => {
        updateAppShortcode({
          rule: {
            url: message,
            shortCode: string,
          },
        })
          .unwrap()
          .then((data) => {
            console.log(data)
            return data.url
          })
          .catch((error) => {
            console.log(error)
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
      <CommonInput
        size={SIZE.compact}
        overrides={{
          Input: {
            style: {
              backgroundColor: 'white',
              borderLeftWidth: '1px',
              borderRightWidth: '1px',
              borderTopWidth: '1px',
              borderBottomWidth: '1px',
            },
          },
          Root: {
            style: {
              borderLeftWidth: '1px',
              borderRightWidth: '1px',
              borderTopWidth: '1px',
              borderBottomWidth: '1px',
            },
          },
        }}
        disabled={status === EditableStatus.COMMITTING}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        {...props}
      />
    )
  }

  return (
    <Drawer isOpen={isShowing.syncSheet} autoFocus onClose={closeSheet}>
      {data && (
        <CommonTable isLoading={rulesAreLoading || appsAreLoading} data={data}>
          <TableBuilderColumn
            header="Shortcut"
            overrides={{ TableHeadCell: { style: { width: '300px' } } }}>
            {(row: OktaApp) => <span>{row.label}</span>}
          </TableBuilderColumn>
          <TableBuilderColumn
            header="URL"
            overrides={{ TableHeadCell: { style: { width: '75px' } } }}>
            {(row: OktaApp) => {
              const appAssociation = rulesData.find(
                (rule) => rule.url === row.linkUrl
              )

              return (
                <EditableCell
                  id={row.id}
                  field={row.linkUrl}
                  placeholder="No URL"
                  value={appAssociation && appAssociation.shortCode}
                />
              )
            }}
          </TableBuilderColumn>
          <TableBuilderColumn
            overrides={{ TableHeadCell: { style: { width: '35px' } } }}>
            {(row: OktaApp) => (
              <Button
                // onClick={() => deleteRule(row.id)}
                kind={KIND.secondary}
                size={SIZE.compact}
                shape={SHAPE.pill}>
                <Delete />
              </Button>
            )}
          </TableBuilderColumn>
        </CommonTable>
      )}
    </Drawer>
  )
}

export default SyncSheet
