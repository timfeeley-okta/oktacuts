import * as React from 'react'

import { useAppDispatch, useAppSelector } from '@/state/index'

import { setUI } from '@/state/ui'

import Drawer from '@/components/Drawer'

import omniBox from './omnibox.png'
import arrow from './arrow.png'
import AddForm from '@/components/Editor/Add/form'

const AddModal = () => {
  const dispatch = useAppDispatch()
  const isShowing = useAppSelector(({ ui }) => ui)

  const closeSheet = () => {
    synchronizeValues({ url: '', shortCode: '' })
    dispatch(setUI({ uiElement: 'addModal', value: false }))
  }

  const shortcodeResultRef = React.useRef<HTMLSpanElement>()
  const redirectResultRef = React.useRef<HTMLSpanElement>()
  const shortcodeInputRef = React.useRef<HTMLSpanElement>()
  const redirectInputRef = React.useRef<HTMLSpanElement>()

  const synchronizeValues = ({ url, shortCode }) => {
    console.log(url, shortCode)
    ;[shortcodeInputRef, shortcodeResultRef].forEach(
      (ref) =>
        (ref.current.innerText = shortCode ? shortCode + '/' : 'shortcut/')
    )
    ;[redirectResultRef, redirectInputRef].forEach(
      (ref) => (ref.current.innerText = url ? url : 'https://example.com/')
    )
  }

  return (
    <Drawer show={isShowing.addModal} onClose={closeSheet}>
      <section className="p-6 text-lg font-bold bg-gray-100">
        Add Shortcut
      </section>
      <section className="p-6 bg-gray-100">
        <aside className="relative -top-7">
          <span
            ref={shortcodeInputRef}
            className="absolute text-base font-medium top-3 left-11">
            shortcut/
          </span>
          <img width={300} src={omniBox}></img>
        </aside>
        <img
          className="absolute z-10 h-20 mt-1 left-32 top-24 max-w-none"
          src={arrow}></img>
        <aside className="relative left-48">
          <span
            ref={redirectInputRef}
            className="absolute text-base font-medium top-3 left-11">
            https://example.com/
          </span>
          <img width={300} src={omniBox}></img>
        </aside>
        <div className="mt-6 text-base">
          When you type{' '}
          <kbd
            className="p-1 font-bold text-yellow-600 bg-yellow-100"
            ref={shortcodeResultRef}>
            shortcut/
          </kbd>{' '}
          in the URL bar, you’ll be taken to{' '}
          <strong className="font-bold text-yellow-600" ref={redirectResultRef}>
            https://example.com
          </strong>
        </div>
      </section>
      <AddForm onChange={synchronizeValues} closeSheet={closeSheet} />
    </Drawer>
  )
}

export default AddModal
