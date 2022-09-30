import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
const initialLabelState: { labelName: string[] } = {
  labelName: []
}

export const labelSlice = createSlice({
  name: 'label',
  initialState: initialLabelState,
  reducers: {
    getLabel: (state, action: PayloadAction<string>) => {
      state.labelName = [...state.labelName, action.payload]
    }
  }
})
export const { getLabel } = labelSlice.actions
export default labelSlice.reducer
