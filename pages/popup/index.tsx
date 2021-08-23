import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from '@/state/data/index'

import Popup from '@/components/Popup'

import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'

const engine = new Styletron()

render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Provider store={store}>
          <Popup />
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
  window.document.querySelector('#app-container')
)
