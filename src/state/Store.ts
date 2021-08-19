import { rulesApi } from './Rules'
import { appsApi } from './Apps'
import uiState from './UI'

import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [rulesApi.reducerPath]: rulesApi.reducer,
    [appsApi.reducerPath]: appsApi.reducer,
    uiState,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rulesApi.middleware, appsApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// export const store = configureStore({
//   reducer: {
//     posts: appsReducer,
//     rules: api.reducer,
//   },
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
