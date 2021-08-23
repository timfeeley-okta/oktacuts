import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
type UIState = {
  syncSheet: boolean
  aboutModal: boolean
  addModal: boolean
}

// Define the initial state using that type
const initialState: UIState = {
  syncSheet: false,
  aboutModal: false,
  addModal: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUI: (state, action) => {
      console.log(action.payload)
      return { ...state, [action.payload.uiElement]: action.payload.value }
    },
  },
})

export const { setUI } = uiSlice.actions
export default uiSlice.reducer
