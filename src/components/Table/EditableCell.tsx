import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
} from 'react'

import { Column, Row } from 'react-table'
import { Rule, useUpdateRuleMutation } from '@/state'

const EditableCell: FC<{
  value: any
  row: Row<Rule>
  column: Column
  dispatch: (rowIndex: number, columnId: number, value: string) => Row
}> = ({ value: initialValue, row, column }) => {
  const [value, setValue] = useState(initialValue)
  const [editableValue, setEditableValue] = useState(initialValue)

  const [updateExistingRule] = useUpdateRuleMutation()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableValue(e.target.value)
  }

  const onBlur = () => setEditableValue(value)

  const storeNewValue = async () => {
    console.log(column.id, row.original, editableValue, value)
    updateExistingRule({
      rule: { id: row.original.id, [column.id]: editableValue },
    })
      .unwrap()
      .then(() => setValue(editableValue))
      .catch((error) => {
        console.log(error)
        setValue(initialValue)
        setEditableValue(initialValue)
      })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      storeNewValue()
    } else if (e.key === 'Escape') {
      setEditableValue(value)
      onBlur()
    }
  }

  useEffect(() => {
    setEditableValue(editableValue)
  }, [editableValue])

  return (
    <input
      className="w-full h-full px-6 py-4 font-mono outline-none focus:ring-inset focus:ring"
      value={editableValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  )
}

export default EditableCell
