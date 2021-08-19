import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
} from 'react'
import { useUpdateRuleMutation } from '../../state/Rules'
import cx from 'classnames'
const EditableCell: FC<any> = ({
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
      className={cx(
        'w-full h-full px-4 py-3 font-mono outline-none focus:ring-inset focus:ring',
        className
      )}
      value={editableValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      {...props}
    />
  )
}

export default EditableCell
