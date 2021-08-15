import React, { FC } from 'react'
import { useAddRuleMutation } from '@/state'

const AddButton: FC<any> = ({ data }) => {
  const [addNewRule] = useAddRuleMutation()
  const onClick = () => {
    addNewRule({
      rule: {
        id: data.length + 1,
        shortCode: 'url' + (data.length + 1),
        url: 'http://google.com/?q=' + (data.length + 1),
      },
    })
      .then((r) => console.log('Success', r))
      .catch((r) => console.log('Error', r))
  }
  return <button onClick={onClick}>Delete</button>
}

export default AddButton
