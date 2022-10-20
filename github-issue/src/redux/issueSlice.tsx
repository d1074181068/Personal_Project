import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

type InitStateType = {
  labelName: { text: string; colorCode: string }[]
  assignees: { text: string; imageUrl: string }[]
  content: {
    title: string
    body: string
  }
}

type LabelActionType = {
  text: string
  colorCode: string
}
type AssigneeActionType = {
  text: string
  imageUrl: string
}

const initialState: InitStateType = {
  labelName: [],
  assignees: [],
  content: {
    title: '',
    body: ''
  }
}

export const issueSlice = createSlice({
  name: 'issue',
  initialState: initialState,
  reducers: {
    handleLabelTag: (state, action: PayloadAction<LabelActionType>) => {
      const { text } = action.payload
      if (state.labelName.some((item) => item.text === text)) {
        state.labelName = _.remove(
          state.labelName,
          (lableItem) => lableItem.text !== text
        )
        return
      }
      state.labelName.push(action.payload)
    },
    handleAssignee: (state, action: PayloadAction<AssigneeActionType>) => {
      const { text } = action.payload
      if (state.assignees.some((item) => item.text === text)) {
        state.assignees = _.remove(
          state.assignees,
          (assigneeItem) => assigneeItem.text !== text
        )
        return
      }
      state.assignees.push(action.payload)
    },
    handleTitle: (state, action: PayloadAction<string>) => {
      state.content.title = action.payload
    },
    handleIssueBody: (state, action: PayloadAction<string>) => {
      state.content.body = action.payload
    },
    githubAction: (state, action: PayloadAction<string>) => {
      state.content.body += ' ' + action.payload
    },
    resetAssignees: (state) => {
      state.assignees = []
    },
    resetIssueContent: () => initialState
  }
})

export const {
  handleLabelTag,
  handleAssignee,
  handleTitle,
  handleIssueBody,
  resetIssueContent,
  githubAction,
  resetAssignees
} = issueSlice.actions
export default issueSlice.reducer
