import AboutModal from '@/components/About'
import { useAppDispatch } from '@/state/index'
import { setUI } from '@/state/ui'

import * as React from 'react'

import Editor from '../Editor'
import AddModal from '../Editor/Add'
import SyncSheet from '../Sync'

const Popup: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <main className="w-152 h-142">
      <header className="flex items-center justify-between p-4 bg-gray-50">
        <div className="flex items-center">
          <h2 className="text-2xl font-medium leading-7 text-gray-900">
            Oktacuts
          </h2>
          <button
            className="p-1 mx-3 mt-1.5 underline text-oktaBlue focus:ring"
            onClick={() => {
              dispatch(setUI({ uiElement: 'aboutModal', value: true }))
            }}>
            About
          </button>
        </div>
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
            className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-oktaBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              dispatch(setUI({ uiElement: 'addModal', value: true }))
            }}>
            Add Shortcut
          </button>
        </div>
      </header>
      <section className="p-4 bg-white">
        <SyncSheet />
        <AboutModal />
        <AddModal />
        <Editor />
      </section>
    </main>
  )
}

export default Popup
