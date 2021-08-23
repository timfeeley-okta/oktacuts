import React, { Fragment } from 'react'
import { useAppSelector, useAppDispatch } from '../../state2/index'
import { setUI } from '../../state2/UI'

const AddModal = () => {
  const closeModal = () => {
    dispatch(setUI({ uiElement: 'addModal', value: false }))
  }

  const isShowing = useAppSelector(({ uiState }) => uiState)
  const dispatch = useAppDispatch()

  return <>Add</>
}
export default AddModal
