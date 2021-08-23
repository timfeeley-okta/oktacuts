import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
} from 'react'
import { Rule, useUpdateRuleMutation } from '../../state2/Rules'
import { Column, Row } from 'react-table'

type Props = {
  row: Row<Rule>
  column: Column
  value: any
  className?: string
}

const EditableCell: FC<Props> = ({
  value: initialValue,
  row,
  column,
  className,
  ...props
}) => {
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
      value={editableValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  )
}

export default EditableCell
