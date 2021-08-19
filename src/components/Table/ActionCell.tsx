import React, { FC } from 'react'

import { Column, Row } from 'react-table'
import { useDeleteRuleMutation } from '@/state/Rules'
import { Rule } from '../../state/Rules'

const ActionCell: FC<{
  value: any
  row: Row<Rule>
  column: Column
  dispatch: (rowId: number) => Row
}> = ({ row }) => {
  const [deleteRule] = useDeleteRuleMutation()

  const onClick = () => {
    deleteRule(row.original.id)
  }
  return <button onClick={onClick}>Delete</button>
}

export default ActionCell
