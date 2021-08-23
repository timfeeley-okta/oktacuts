import {
  useDeleteRuleMutation,
  useGetRulesQuery,
  useUpdateRuleMutation,
} from '@/state/data'

import { EditableStatus, useEditable } from '@dcwither/react-editable'
import { Button, KIND, SHAPE } from 'baseui/button'
import { Delete } from 'baseui/icon'
import { Input, SIZE } from 'baseui/input'
import { TableBuilderColumn } from 'baseui/table-semantic'
import { toaster, ToasterContainer } from 'baseui/toast'
import * as React from 'react'

import CommonTable from '../../styled/table'

const Editor = () => {
  const { data, isLoading } = useGetRulesQuery()
  const [updateExistingRule] = useUpdateRuleMutation()
  const [deleteRule] = useDeleteRuleMutation()

  const EditableCell = ({ id, field, value: currentValue }) => {
    const { value, onCancel, onChange, onCommit } = useEditable({
      value: currentValue,
      onCommit: (message, string) => {
        updateExistingRule({
          rule: { id, [message]: string },
        })
          .unwrap()
          .then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.log(error)
            toaster.negative(<span>{error}</span>, {
              autoHideDuration: 2500,
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
      <Input
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
      />
    )
  }

  return (
    <div>
      <ToasterContainer placement="topRight" />
      {data && (
        <CommonTable isLoading={isLoading} data={data}>
          <TableBuilderColumn
            header="Shortcut"
            overrides={{ TableHeadCell: { style: { width: '100px' } } }}>
            {(row: Rule) => (
              <EditableCell
                id={row.id}
                field="shortCode"
                value={row.shortCode}
              />
            )}
          </TableBuilderColumn>
          <TableBuilderColumn
            header="URL"
            overrides={{ TableHeadCell: { style: { width: '400px' } } }}>
            {(row: Rule) => (
              <EditableCell id={row.id} field="url" value={row.url} />
            )}
          </TableBuilderColumn>
          <TableBuilderColumn
            overrides={{ TableHeadCell: { style: { width: '50px' } } }}>
            {(row: Rule) => (
              <Button
                onClick={() => deleteRule(row.id)}
                kind={KIND.secondary}
                size={SIZE.compact}
                shape={SHAPE.pill}>
                <Delete />
              </Button>
            )}
          </TableBuilderColumn>
        </CommonTable>
      )}
    </div>
  )
}

export default Editor
