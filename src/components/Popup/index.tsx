import { useAppDispatch } from '@/state/index'
import { setUI } from '@/state/ui'

import * as React from 'react'

import Editor from '../Editor'
import AddModal from '../Editor/add'
import SyncSheet from '../Sync'

const Popup: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <main className="w-152 h-120">
      <header className="flex items-center justify-between p-4 bg-gray-50">
        <h2 className="text-2xl font-medium leading-7 text-gray-900">
          Oktacuts
        </h2>
        <div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              dispatch(setUI({ uiElement: 'syncSheet', value: true }))
            }}>
            Sync
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              dispatch(setUI({ uiElement: 'addModal', value: true }))
            }}>
            Publish
          </button>
        </div>
      </header>
      <section className="p-4 bg-white">
        <SyncSheet />
        <AddModal />
        <Editor />
      </section>
    </main>
  )
}

export default Popup
