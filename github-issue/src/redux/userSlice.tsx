import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: {
  token: string
} = {
  token: ''
}

export const userSlice = createSlice({
  name: 'query',
  initialState: initialState,
  reducers: {
    storeToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    }
  }
})

export const { storeToken } = userSlice.actions
export default userSlice.reducer
