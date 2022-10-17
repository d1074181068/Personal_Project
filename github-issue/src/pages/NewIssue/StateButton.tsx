//libraries
import {
  IssueClosedIcon,
  SkipIcon,
  IssueReopenedIcon,
  TriangleDownIcon,
  CheckIcon
} from '@primer/octicons-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

//custom
import {
  useUpdateIssueMutation,
  useCreateCommentMutation
} from '../../redux/issueApiSlice'
import { RootState } from '../../redux/store'

type PropsType = {
  state: string
  stateReason: string | null
}

function StateButton({ state, stateReason }: PropsType) {
  const repo = sessionStorage.getItem('repo')
  const userName = localStorage.getItem('userName')
  const [statusButtonDropdown, setStatusButtonDropdown] = useState(false)
  const { issueReducer, userReducer } = useSelector((store: RootState) => store)
  const { issueId } = useParams()
  const [updateIssue] = useUpdateIssueMutation()
  const [createComment] = useCreateCommentMutation()
  const [clickStateButton, setClickStateButton] = useState('top')
  const [currentState, setCurrentState] = useState({
    state: state === 'open' ? 'closed' : 'open',
    stateReason: state === 'open' ? 'completed' : 'reopened'
  })
  useEffect(() => {
    setCurrentState({
      ...currentState,
      state: state === 'open' ? 'closed' : 'open',
      stateReason: state === 'open' ? 'completed' : 'reopened'
    })
    setClickStateButton('top')
  }, [state, stateReason])

  return (
    <>
      {state && (
        <div className='relative mr-1'>
          <button
            className='rounded-tl rounded-bl border border-r-0 border-solid border-borderGray px-[16px] py-[6px] hover:bg-commonBgGray'
            onClick={async () => {
              if (issueReducer.content.body !== '') {
                await createComment({
                  name: userName ? userName : '',
                  repo: repo ? repo : '',
                  token: userReducer.token,
                  issueNumber: issueId as string,
                  body: {
                    body: issueReducer.content.body
                  }
                })
              }
              await updateIssue({
                name: userName ? userName : '',
                repo: repo ? repo : '',
                token: userReducer.token,
                issueNumber: issueId as string,
                body: {
                  state: currentState.state,
                  state_reason: currentState.stateReason
                }
              })
            }}>
            <span
              className={`mr-1 ${
                currentState.state === 'closed'
                  ? currentState.stateReason === 'completed'
                    ? 'text-[#8250df]'
                    : 'text-[#57606a]'
                  : 'text-[#2DA44E]'
              }`}>
              {currentState.state === 'closed' ? (
                currentState.stateReason === 'completed' ? (
                  <IssueClosedIcon />
                ) : (
                  <SkipIcon />
                )
              ) : (
                <IssueReopenedIcon />
              )}
            </span>
            <span className='font-medium'>
              {currentState.state === 'closed'
                ? issueReducer.content.body !== ''
                  ? 'Close With Comment'
                  : currentState.stateReason === 'completed'
                  ? 'Close as completed'
                  : 'Close as not planned'
                : 'Reopen'}
            </span>
          </button>
          <button
            className='rounded-tr rounded-br border border-solid border-borderGray px-[12px] py-[6px] hover:bg-commonBgGray'
            onClick={() => setStatusButtonDropdown(true)}>
            <TriangleDownIcon />
          </button>
          <div
            className={`${
              statusButtonDropdown ? 'block' : 'hidden'
            } fixed top-0 left-0 right-0 bottom-0 z-[120]`}
            onClick={() => setStatusButtonDropdown(false)}></div>
          <ul
            className={`${
              statusButtonDropdown ? 'block' : 'hidden'
            } absolute top-[33px] right-0 z-199 w-[300px] rounded border border-solid border-borderGray bg-white`}>
            <li
              className='group flex cursor-pointer items-center rounded-tr rounded-tl border-b border-solid border-borderGray py-1 pl-4 font-medium hover:bg-hoverBlue hover:text-white'
              onClick={() => {
                setClickStateButton('top')
                if (state === 'open') {
                  setCurrentState({
                    ...currentState,
                    state: 'closed',
                    stateReason: 'completed'
                  })
                  setStatusButtonDropdown(false)
                  return
                }
                setCurrentState({
                  ...currentState,
                  state: 'open',
                  stateReason: 'reopened'
                })
                setStatusButtonDropdown(false)
              }}>
              <div
                className={`${
                  clickStateButton === 'top' ? 'block' : 'hidden'
                } absolute left-[10px]`}>
                <CheckIcon />
              </div>
              <span
                className={`mr-[5px] ${
                  state === 'open' ? 'text-[#8250df]' : 'text-[#2DA44E]'
                }  group-hover:text-white`}>
                {state === 'open' ? <IssueClosedIcon /> : <IssueReopenedIcon />}
              </span>
              <span>
                {state === 'open' ? 'Closed as completed' : 'Reopen issue'}
              </span>
            </li>
            <li
              className='group relative flex cursor-pointer items-center rounded-br rounded-bl py-1 pl-4 font-medium hover:bg-hoverBlue hover:text-white'
              onClick={() => {
                setClickStateButton('bottom')
                if (state === 'open' || stateReason === 'completed') {
                  setCurrentState({
                    ...currentState,
                    state: 'closed',
                    stateReason: 'not_planned'
                  })
                  setStatusButtonDropdown(false)
                  return
                }
                setCurrentState({
                  ...currentState,
                  state: 'closed',
                  stateReason: 'completed'
                })
                setStatusButtonDropdown(false)
              }}>
              <div
                className={`${
                  clickStateButton === 'bottom' ? 'block' : 'hidden'
                } absolute left-[10px]`}>
                <CheckIcon />
              </div>
              <span
                className={`mr-[5px] ${
                  state === 'open'
                    ? 'text-[#57606a]'
                    : stateReason === 'not_planned'
                    ? 'text-[#8250df]'
                    : 'text-[#57606a]'
                }  group-hover:text-white`}>
                {state === 'open' ? (
                  <SkipIcon />
                ) : stateReason === 'not_planned' ? (
                  <IssueClosedIcon />
                ) : (
                  <SkipIcon />
                )}
              </span>
              <span>
                {state === 'open'
                  ? 'Closed as not planned'
                  : stateReason === 'not_planned'
                  ? 'Closed as completed'
                  : 'Closed as not planned'}
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default StateButton
