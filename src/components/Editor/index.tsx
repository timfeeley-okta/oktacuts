import {
  useDeleteRuleMutation,
  useGetRulesQuery,
  useUpdateRuleMutation,
} from '@/state/data'

import { TrashIcon } from '@heroicons/react/outline'

import * as React from 'react'
import TableHead from '@/components/Table/Headers'
import EditableCell from '@/components/Table/EditableCell'
import { TableBody, TableBodyColumn } from '@/components/Table/Body'

const Editor = () => {
  const { data } = useGetRulesQuery()
  const [updateExistingRule] = useUpdateRuleMutation()
  const [deleteRule] = useDeleteRuleMutation()

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

  const submitFunction = ({ id, key, value }) => {
    return updateExistingRule({
      rule: {
        id,
        [key]: value,
      },
    })
  }

  return (
    <div>
      {data && (
        <table className="divide-y divide-gray-200">
          <TableHead data={cols} />
          <TableBody data={data}>
            <TableBodyColumn column="shortCode" className="px-4 py-2">
              {({ row }) => (
                <EditableCell
                  submitFunction={submitFunction}
                  id={row.id}
                  field="shortCode"
                  value={row.shortCode}
                />
              )}
            </TableBodyColumn>
            <TableBodyColumn column="url" className="px-4 py-2">
              {({ row }) => (
                <EditableCell
                  submitFunction={submitFunction}
                  id={row.id}
                  field="url"
                  value={row.url}
                />
              )}
            </TableBodyColumn>
            <TableBodyColumn column="id" className="px-4 py-2">
              {({ row }) => (
                <button
                  type="button"
                  onClick={() => deleteRule(row.id)}
                  className="inline-flex items-center border border-transparent">
                  <TrashIcon className="-ml-0.5 mr-2 h-4 w-4 mt-0.5" />
                </button>
              )}
            </TableBodyColumn>
          </TableBody>
          {/* <tbody>
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
          </tbody> */}
        </table>
      )}
    </div>
  )
}

export default Editor
