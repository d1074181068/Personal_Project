import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

type InitStateType = {
  labelName: { text: string; colorCode: string }[]
  assignees: { text: string; imageUrl: string }[]
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
  assignees: []
}

export const newIssueSlice = createSlice({
  name: 'newIssue',
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
      state.labelName = [...state.labelName, action.payload]
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
      state.assignees = [...state.assignees, action.payload]
    }
  }
})

export const { handleLabelTag, handleAssignee } = newIssueSlice.actions
export default newIssueSlice.reducer
