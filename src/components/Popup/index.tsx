import React, { FC, useMemo } from 'react'

import Table, { ActionCell, AddButton, EditableCell } from '../Table'
import type { Column } from 'react-table'

import { useAppDispatch } from '@/state/index'
import { setUI } from '@/state/UI'
import { useGetRulesQuery } from '@/state/Rules'
import SyncSheet from '../Sync'

const Popup: FC = () => {
  const { data: rules } = useGetRulesQuery()

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

  const data = useMemo(() => rules, [rules])
  const dispatch = useAppDispatch()
  return (
    <>
      <SyncSheet />
      {
        <button
          onClick={() => {
            // fetch(
            //   'https://okta.okta.com/api/v1/users/me/home/tabs?type=all&expand=items%2Citems.resource'
            // ).then(async (b) => alert(await b.json()))

            dispatch(setUI({ uiElement: 'syncSheet', value: true }))
          }}>
          Do it
        </button>
      }

      {rules && <Table data={data} columns={columns} />}
    </>
  )
}

export default Popup
