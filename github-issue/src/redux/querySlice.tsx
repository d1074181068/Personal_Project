import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState: {
  labelName: string[]
  assigneeUser: string
  issueState: string
  filters: string
} = {
  labelName: [],
  assigneeUser: '',
  issueState: 'open',
  filters: ''
}

export const querySlice = createSlice({
  name: 'query',
  initialState: initialState,
  reducers: {
    handleFilters: (state, action: PayloadAction<string>) => {
      state.labelName.splice(0, state.labelName.length)
      state.assigneeUser = ''
      state.issueState = 'open'
      state.filters = action.payload
    },
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
  handleStateFilter,
  handleFilters
} = querySlice.actions
export default querySlice.reducer
