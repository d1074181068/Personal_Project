import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialLabelState: {
  labelName: string[]
  assigneeUser: string
  issueState: string
} = {
  labelName: [],
  assigneeUser: '',
  issueState: ''
}

export const querySlice = createSlice({
  name: 'query',
  initialState: initialLabelState,
  reducers: {
    handleStateFilter: (state, action: PayloadAction<string>) => {
      state.issueState = action.payload
    },
    addLabelFilterText: (state, action: PayloadAction<string>) => {
      state.labelName = _.uniq([...state.labelName, action.payload])
    },
    deleteLabelFilterText: (state, action: PayloadAction<string>) => {
      state.labelName = _.remove(
        state.labelName,
        (text) => text !== action.payload
      )
    },
    updateAssigneeUser: (state, action: PayloadAction<string>) => {
      state.assigneeUser = action.payload
    }
  }
})

export const {
  addLabelFilterText,
  deleteLabelFilterText,
  updateAssigneeUser,
  handleStateFilter
} = querySlice.actions
export default querySlice.reducer
