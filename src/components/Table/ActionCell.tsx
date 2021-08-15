import React, { FC } from 'react'

import { Column, Row } from 'react-table'
import { Rule, useDeleteRuleMutation } from '@/state'

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
