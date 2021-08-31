import { useToast } from '@/components/Toast/ToastProvider'
import { EditableStatus, useEditable } from '@dcwither/react-editable'
import { MutationActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate'
import React from 'react'

type Props = {
  id: string | number
  field: string
  value: string
  placeholder?: string
  submitFunction: (any) => MutationActionCreatorResult<any>
}

const TableEditableCell = ({
  id,
  field,
  submitFunction,
  value: currentValue,
  ...props
}: Props) => {
  const { addToast } = useToast()

  const { status, value, onCancel, onChange, onCommit } = useEditable({
    value: currentValue,
    onCommit: (key, value) =>
      submitFunction({ id, key, value })
        .unwrap()
        .catch(error => addToast(error)),
  })

  const handleBlur = () => {
    onCommit(field)
  }

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
      className="block w-full text-xs text-gray-700 border-transparent rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
      disabled={status === EditableStatus.COMMITTING}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      value={value}
      {...props}
    />
  )
}

export default TableEditableCell
