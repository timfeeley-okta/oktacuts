import React, { FC } from 'react'

import { Column, Row } from 'react-table'
import { useDeleteRuleMutation } from '@/state/Rules'
import { Rule } from '@/state/Rules'
import { XCircleIcon } from '@heroicons/react/outline'

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
      <XCircleIcon className="w-4 h-4 text-red-700" />
    </button>
  )
}

export default ActionCell
