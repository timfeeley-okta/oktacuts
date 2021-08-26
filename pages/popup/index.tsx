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
if (module && module.hot) {
  module.hot.accept((err) => {
    console.error('HMR accept() error: ' + err)
  })
  module.hot.addStatusHandler((status) => {
    if (status === 'apply') {
      console.log('HMR: update applied')
    }
  })
}
