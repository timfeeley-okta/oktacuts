import React, { FC } from 'react'

import SyncSheet from '../Sync'
import AddModal from '../Editor/add'
import Editor from '../Editor'

const Popup: FC = () => {
  return (
    <>
      <SyncSheet />
      <AddModal />
      <Editor />
    </>
  )
}

export default Popup
