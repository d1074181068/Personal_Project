import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: {
  token: string
} = {
  token: ''
}

export const tokenSlice = createSlice({
  name: 'query',
  initialState: initialState,
  reducers: {
    storeToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    }
  }
})

export const { storeToken } = tokenSlice.actions
export default tokenSlice.reducer
