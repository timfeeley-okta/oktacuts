import { createSlice } from '@reduxjs/toolkit'

const initialState: UIState = {
  syncSheet: false,
  aboutModal: false,
  addModal: false,
  oktaUrl: {
    url: '',
    good: null,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUI: (state, action) => {
      return { ...state, [action.payload.uiElement]: action.payload.value }
    },
    setOktaUrl: (state: UIState, action) => {
      const oktaUrl = {
        oktaUrl: {
          ...state.oktaUrl,
          [action.payload.key]: action.payload.value,
        },
      }
      console.log({ ...state, ...oktaUrl })
      return { ...state, ...oktaUrl }
    },
  },
})

export const { setUI, setOktaUrl } = uiSlice.actions
export default uiSlice.reducer
