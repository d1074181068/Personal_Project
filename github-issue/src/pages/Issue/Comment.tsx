//libraries
import { KebabHorizontalIcon, SmileyIcon } from '@primer/octicons-react'
import { marked } from 'marked'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

//components
import Label from '../Label/Label'
import UserControlIssue from '../NewIssue/UserControlIssue'
import CommentMenu from './CommentMenu'

//custom
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useUpdateIssueMutation
} from '../../redux/issueApiSlice'
import { RootState } from '../../redux/store'
import { Reactions } from '../../types/issueType'
import { turnReactionsToArray } from '../../utils/transformReactions'
import { calculateTime } from '../IssueList/IssueItem'

export type PropsType = {
  id: number
  body: string
  user: string
  createTime: string
  authorAssociation?: string
  type: string
  reactions: Reactions
}
const issueMenuContentArr = [
  ['Copy link', 'Quote reply'],
  ['Edit'],
  ['Report content']
]
const commentMenuContentArr = [
  ['Copy link', 'Quote reply', 'Reference in new issue'],
  ['Edit', 'Hide', 'Delete'],
  ['Report content']
]
function Comment({
  id,
  body,
  user,
  createTime,
  authorAssociation,
  reactions,
  type
}: PropsType) {
  const repo = sessionStorage.getItem('repo')
  const [actionMenuToggle, setActionMenuToggle] = useState(false)
  const userName = localStorage.getItem('userName')
  const [editTextareaToggle, setEditTexrareaToggle] = useState(false)
  const initBodyText = useRef(body)
  const { issueId } = useParams()
  const [updateComment] = useUpdateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [updateIssue] = useUpdateIssueMutation()
  const { userReducer } = useSelector((store: RootState) => store)
  const [textAreaText, setTextAreaText] = useState(initBodyText.current)
  useEffect(() => {
    initBodyText.current = body
    setTextAreaText(body)
  }, [body])
  return (
    <>
      <div
        className={`${
          !editTextareaToggle ? 'block' : 'hidden'
        } mb-4 rounded border border-solid ${
          authorAssociation === 'OWNER'
            ? 'border-[rgba(84,174,255,0.4)]'
            : 'border-borderGray'
        }  bg-white`}>
        <header
          className={`flex justify-between border-b border-solid  ${
            authorAssociation === 'OWNER'
              ? 'border-[rgba(84,174,255,0.4)] bg-[rgb(221,244,255)]'
              : 'border-borderGray bg-commonBgGray'
          }  px-2 py-1`}>
          <span className='font-medium text-textBlack'>
            {user}
            <span className='ml-[5px] text-textGray'>
              commented {calculateTime(createTime)} ago
            </span>
          </span>
          <div className='flex items-center text-[12px]'>
            {authorAssociation === 'NONE' ? (
              <></>
            ) : (
              <div className='mr-[5px] hidden sm:block'>
                <Label
                  labelName={
                    (authorAssociation?.[0] as string) +
                    authorAssociation?.slice(1).toLowerCase()
                  }
                  colorCode={'transparent'}
                  border={
                    authorAssociation === 'OWNER'
                      ? '1px solid rgba(84,174,255,0.4)'
                      : '1px solid #d0d7de'
                  }
                  textColor={'#57606a'}
                  padding={'1px 5px'}
                />
              </div>
            )}

            <button className='mr-[5px] hidden text-textGray hover:text-hoverBlue md:block'>
              <SmileyIcon />
            </button>
            <div className='relative'>
              <button
                className='ml-[5px] text-textGray hover:text-hoverBlue'
                onClick={() => setActionMenuToggle(true)}>
                <KebabHorizontalIcon />
              </button>
              <CommentMenu
                menuContent={
                  type === 'issueComment'
                    ? issueMenuContentArr
                    : commentMenuContentArr
                }
                actionMenuToggle={actionMenuToggle}
                clickEditFn={() => {
                  setActionMenuToggle(false)
                  setEditTexrareaToggle(true)
                }}
                clickDeleteFn={
                  type === 'comment'
                    ? () => {
                        const confirmDelete = window.confirm(
                          'Are you sure you want to delete this?'
                        )
                        if (confirmDelete) {
                          deleteComment({
                            name: userName ? userName : '',
                            repo: repo ? repo : '',
                            commentId: id
                          })
                        }
                        setActionMenuToggle(false)
                      }
                    : () => {}
                }
              />
              <div
                className={`${
                  actionMenuToggle ? 'block' : 'hidden'
                } fixed top-0 left-0 right-0 bottom-0 z-[120]`}
                onClick={() => setActionMenuToggle(false)}></div>
            </div>
          </div>
        </header>
        <main className='m-2'>
          <div
            className={`prose ${body || 'text-[textGray]'}`}
            dangerouslySetInnerHTML={{
              __html: marked(body || '*No description provided.*')
            }}></div>
          <ul
            className={`${
              reactions.total_count !== 0 ? 'mt-2' : 'mt-0'
            }  flex items-center`}>
            <>
              {reactions.total_count !== 0 && (
                <li className='mr-1 rounded-circle border border-solid border-borderGray bg-commonBgGray p-[5px] text-textGray'>
                  <button>
                    <SmileyIcon />
                  </button>
                </li>
              )}
              {turnReactionsToArray(reactions)}
            </>
          </ul>
        </main>
      </div>
      <div className={`${editTextareaToggle ? 'block' : 'hidden'} mb-4`}>
        <UserControlIssue
          titleInputPlaceholder=''
          textAreaText={textAreaText}
          setTextAreaText={setTextAreaText}
          cancelBtn={{
            bgcolor: '#f6f8fa',
            $text: 'Cancel',
            textColor: '#cf222e',
            hoverColor: '#cf222e',
            hoverTextColor: 'white',
            border: '1px solid #d0d7de',
            clickFn: () => {
              const confirmCancel = window.confirm(
                'Are you sure you want to discard your unsaved changes?'
              )
              if (confirmCancel) {
                setTextAreaText(initBodyText.current)
                setEditTexrareaToggle(false)
              }
            }
          }}
          actionBtn={{
            bgcolor: '#2DA44E',
            $text: 'Update comment',
            textColor: 'white',
            hoverColor: '#2c974b',
            clickFn: () => {
              if (type === 'comment') {
                updateComment({
                  name: userName ? userName : '',
                  repo: repo ? repo : '',
                  commentId: id,
                  body: {
                    body: textAreaText
                  }
                })
              } else {
                updateIssue({
                  name: userName ? userName : '',
                  repo: repo ? repo : '',
                  issueNumber: issueId as string,
                  body: {
                    body: textAreaText
                  }
                })
              }
              setEditTexrareaToggle(false)
            }
          }}
          mobileExist={true}
        />
      </div>
    </>
  )
}

export default Comment
