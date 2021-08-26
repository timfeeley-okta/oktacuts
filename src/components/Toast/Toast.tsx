import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { useToast } from './ToastProvider'
import { Transition } from '@headlessui/react'

const Toast = ({ children, id, kind = 'warning' }) => {
  const { removeToast } = useToast()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [id, removeToast])
  return (
    <Transition
      appear={true}
      show={visible}
      enter="ease-out duration-500"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      afterLeave={() => {
        removeToast(id)
      }}
      className={cx(
        'transform w-full max-w-sm overflow-hidden rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5',
        {
          'bg-red-800 text-base text-white': kind == 'warning',
        }
      )}>
      <div className="p-4">{children}</div>
    </Transition>
  )
}

export default Toast
