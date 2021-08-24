import Toast from './Toast'
import React, { useState, useContext, useCallback } from 'react'

import { createPortal } from 'react-dom'

const ToastContext = React.createContext(null)

type ToastType = {
  id: number
  content: string | React.ReactChild
}

const ToastContainer = ({ toasts }: { toasts: ToastType[] }) => {
  return createPortal(
    <div
      id="toast-portal"
      className="absolute z-50 transform -translate-x-1/2 pointer-events-none bottom-12 left-1/2">
      {toasts.map(({ id, content }) => (
        <Toast key={'toast_' + id} id={id}>
          {content}
        </Toast>
      ))}
    </div>,
    document.body
  )
}

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(
    (content) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: new Date().valueOf(),
          content,
        },
      ])
    },
    [setToasts]
  )

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id))
    },
    [setToasts]
  )

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => {
  const toastHelpers = useContext(ToastContext)
  return toastHelpers
}

export { ToastContext, useToast }
export default ToastProvider
