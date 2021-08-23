import React, { FC } from 'react'
import { useAddRuleMutation } from 'src/state2/Rules'
import { useAppDispatch } from 'src/state2/index'
import { setUI } from 'src/state2/UI'

const AddButton: FC<any> = ({ data }) => {
  const [addNewRule] = useAddRuleMutation()

  const dispatch = useAppDispatch()
  const onClick = () => {
    // addNewRule({
    //   rule: {
    //     id: data.length + 1,
    //     shortCode: 'url' + (data.length + 1),
    //     url: 'http://google.com/?q=' + (data.length + 1),
    //   },
    // })
    //   .then((r) => console.log('Success', r))
    //   .catch((r) => console.log('Error', r))
  }
  return (
    <button
      type="button"
      onClick={() => dispatch(setUI({ uiElement: 'addModal', value: true }))}
      className="transition -ml-6 inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Add
    </button>
  )
}

export default AddButton
