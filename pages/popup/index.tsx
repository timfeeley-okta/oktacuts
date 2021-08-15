import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from '@/state'
import Popup from '@/components/Popup'

import 'tailwindcss/tailwind.css'

render(
  <React.StrictMode>
    <Provider store={store}>
      <Popup />
    </Provider>
  </React.StrictMode>,
  window.document.querySelector('#app-container')
)
