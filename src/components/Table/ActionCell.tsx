import React, { FC } from 'react'

import { Column, Row } from 'react-table'
import { useDeleteRuleMutation } from 'src/state2/Rules'
import { Rule } from 'src/state2/Rules'

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
  return (
    <button onClick={onClick} className="h-full">
      x
    </button>
  )
}

export default ActionCell
