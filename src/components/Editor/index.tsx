import {
  useDeleteRuleMutation,
  useGetRulesQuery,
  useUpdateRuleMutation,
} from '@/state/data'

import { EditableStatus, useEditable } from '@dcwither/react-editable'

import { TrashIcon } from '@heroicons/react/outline'
import { useToast } from '@/components/Toast/ToastProvider'
import * as React from 'react'

const Editor = () => {
  const { addToast } = useToast()

  const { data } = useGetRulesQuery()
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
          .catch((error) => {
            addToast(error)
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
        name="email"
        id="email"
        className="block w-full text-xs text-gray-700 border-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        disabled={status === EditableStatus.COMMITTING}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
    )
  }

  const cols = [
    {
      id: 'shortCode',
      title: 'Shortcut',
      width: '7.5',
    },
    {
      id: 'url',
      title: 'URL',
      width: '30',
    },
    {
      id: 'actions',
      title: '',
      width: '0.5',
    },
  ]

  return (
    <div>
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
            {data.map((row, index) => (
              <tr key={'tr_' + row.id + '_' + index}>
                <td className="px-4 py-2">
                  <EditableCell
                    id={row.id}
                    field="shortCode"
                    value={row.shortCode}
                  />
                </td>
                <td className="px-4 py-2">
                  <EditableCell id={row.id} field="url" value={row.url} />
                </td>

                <td className="">
                  <button
                    type="button"
                    onClick={() => deleteRule(row.id)}
                    className="inline-flex items-center border border-transparent">
                    <TrashIcon className="-ml-0.5 mr-2 h-4 w-4 mt-0.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Editor
