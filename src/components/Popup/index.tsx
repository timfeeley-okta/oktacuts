import React, { FC, useMemo } from 'react'

import Table, { ActionCell, AddButton, EditableCell } from '../Table'
import type { Column } from 'react-table'

import { useGetRulesQuery } from '@/state'

const Popup: FC = () => {
  const { data: rules, isLoading, isFetching } = useGetRulesQuery()

  const columns = useMemo(
    (): Column[] => [
      {
        Header: 'Shortcut',
        accessor: 'shortCode',
        Cell: EditableCell,
        width: 100,
      },
      {
        Header: 'Full URL',
        accessor: 'url',
        Cell: EditableCell,
        width: 400,
      },
      {
        Header: AddButton,
        Cell: ActionCell,
        accessor: 'action',
        width: 100,
      },
    ],
    []
  )

  const data = useMemo(() => {
    console.log('New rules', rules)
    return rules
  }, [rules])

  return <>{rules && <Table data={data} columns={columns} />}</>
}

export default Popup
