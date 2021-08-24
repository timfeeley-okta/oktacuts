import React from 'react'

import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

type Props = {
  show: boolean
  onClose: () => void
}
const Drawer: React.FC<Props> = ({ show, onClose, children }) => {
  return (
    <>
      <Transition
        show={show}
        enter="transition-opacity ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity  ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 flex max-w-xl pl-10">
        <Transition
          show={show}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="relative w-screen ">
          <Transition
            show={show}
            enter="transition-opacity ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity  ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Close</span>
              <XIcon className="w-6 h-6" />
            </button>
          </Transition>

          <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
            <div className="px-4 sm:px-6">{children}</div>
          </div>
        </Transition>
      </div>
    </>
  )
}

export default Drawer
