import { combineReducers } from 'redux'

const initialLabelState: string[] = []
const initialIssueState: string[] = []
const initialCommentState: string[] = []

type LabelActionADD = {
  type: 'ADD_LABEL'
}
type LabelActionDEL = {
  type: 'DEL_LABEL'
}
type LabelActionUPDATE = {
  type: 'UPDATE_LABEL'
}
function handleLabelreducer(
  state = initialLabelState,
  action: LabelActionADD | LabelActionDEL | LabelActionUPDATE
) {
  switch (action.type) {
    case 'ADD_LABEL': {
      return state
    }
    case 'DEL_LABEL': {
      return state
    }
    case 'UPDATE_LABEL': {
      return state
    }
    default:
      return state
  }
}

type IssueActionADD = {
  type: 'ADD_ISSUE'
}
type IssueActionDEL = {
  type: 'DEL_ISSUE'
}
type IssueActionUPDATE = {
  type: 'UPDATE_ISSUE'
}
type IssueActionFILTER = {
  type: 'FILTER_ISSUE'
}
function handleIssueReducer(
  state = initialIssueState,
  action:
    | IssueActionADD
    | IssueActionDEL
    | IssueActionUPDATE
    | IssueActionFILTER
) {
  switch (action.type) {
    case 'ADD_ISSUE': {
      return state
    }
    case 'DEL_ISSUE': {
      return state
    }
    case 'UPDATE_ISSUE': {
      return state
    }
    case 'FILTER_ISSUE': {
      return state
    }
    default:
      return state
  }
}

type CommentActionADD = {
  type: 'ADD_COMMENT'
}
type CommentActionDEL = {
  type: 'DEL_COMMENT'
}
type CommentActionUPDATE = {
  type: 'UPDATE_COMMENT'
}

function handleCommentReducer(
  state = initialCommentState,
  action: CommentActionADD | CommentActionDEL | CommentActionUPDATE
) {
  switch (action.type) {
    case 'ADD_COMMENT': {
      return state
    }
    case 'DEL_COMMENT': {
      return state
    }
    case 'UPDATE_COMMENT': {
      return state
    }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  label: handleLabelreducer,
  issue: handleIssueReducer,
  comment: handleCommentReducer
})
