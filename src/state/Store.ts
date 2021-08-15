// import appsReducer from './OktaApps'

import { rulesApi } from '.'

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [rulesApi.reducerPath]: rulesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rulesApi.middleware),
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
