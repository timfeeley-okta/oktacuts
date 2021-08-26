import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import dataApi from './data'
import ui from './ui'

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    ui,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(dataApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
