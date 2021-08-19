import React, { FC } from 'react'
import { Column, Row, useFlexLayout, useTable } from 'react-table'
import { Rule } from '@/state/Rules'

const Table: FC<{
  columns: Column[]
  data: any
}> = ({ columns, data }) => {
  const { getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      getRowId: (row: Row<Rule>) => row.id,
    },
    useFlexLayout
  )

  return (
    <div className="flex flex-col mt-4">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <div className="divide-y divide-gray-200 bg-gray-50">
              {headerGroups.map((headerGroup) => {
                const { key, ...restHeaderGroupProps } =
                  headerGroup.getHeaderGroupProps()
                return (
                  <div key={key} {...restHeaderGroupProps}>
                    {headerGroup.headers.map((column) => {
                      const { key, ...restColumn } = column.getHeaderProps()

                      return (
                        <div
                          key={key}
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase group"
                          {...restColumn}>
                          {column.render('Header')}
                        </div>
                      )
                    })}
                  </div>
                )
              })}

              <div
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200">
                {rows.map((row) => {
                  prepareRow(row)
                  const { key, ...restRowProps } = row.getRowProps()
                  return (
                    <div key={key} {...restRowProps}>
                      {row.cells.map((cell) => {
                        const { key, ...restCellProps } = cell.getCellProps()
                        return (
                          <div
                            key={key}
                            {...restCellProps}
                            className="whitespace-nowrap"
                            role="cell">
                            {cell.render('Cell')}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
