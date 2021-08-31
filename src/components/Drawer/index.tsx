import React from 'react'

import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

type Props = {
  show: boolean
  children: JSX.Element[]
  onClose: () => void
}
const Drawer: React.FC<Props> = ({ show, onClose, children }) => {
  const childRef = React.useRef<HTMLDivElement>()
  return (
    <>
      <Transition
        onClick={onClose}
        show={show}
        enter="transition-opacity ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity  ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        aria-hidden="true"
        afterEnter={() => childRef.current.querySelectorAll('input')[0].focus()}
      />
      <div className="fixed inset-y-0 right-0 flex max-w-xl">
        <Transition
          show={show}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              onClose()
            }
          }}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="relative w-screen ">
          <div
            ref={childRef}
            className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
            <button
              type="button"
              onClick={onClose}
              className="absolute w-6 h-6 text-gray-700 rounded-md top-6 right-6 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Close</span>
              <XIcon className="w-6 h-6" />
            </button>
            {children}
          </div>
        </Transition>
      </div>
    </>
  )
}

export default Drawer
