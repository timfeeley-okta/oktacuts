import 'tailwindcss/tailwind.css'

import Popup from '@/components/Popup'
import { store } from '@/state/index'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ToastProvider from '@/components/Toast/ToastProvider'

render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <Popup />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  window.document.querySelector('#app-container')
)
