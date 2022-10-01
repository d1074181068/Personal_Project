import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState: {
  labelName: string[]
  assigneeUser: string
  issueState: string
  filters: string
  sortIssue: string
} = {
  labelName: [],
  assigneeUser: '',
  issueState: 'open',
  filters: '',
  sortIssue: 'created-desc'
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
      state.sortIssue = 'created-desc'
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
    resetLabelFilterText: (state) => {
      state.labelName = []
    },
    updateAssigneeUser: (state, action: PayloadAction<string>) => {
      state.assigneeUser = action.payload
    },
    sortIssue: (state, action: PayloadAction<string>) => {
      state.sortIssue = action.payload
    }
  }
})

export const {
  addLabelFilterText,
  deleteLabelFilterText,
  resetLabelFilterText,
  updateAssigneeUser,
  handleStateFilter,
  handleFilters,
  sortIssue
} = querySlice.actions
export default querySlice.reducer
