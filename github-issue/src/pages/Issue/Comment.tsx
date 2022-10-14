//libraries
import React, { useEffect, useRef, useState } from 'react'
import { SmileyIcon, KebabHorizontalIcon } from '@primer/octicons-react'
import { useSelector } from 'react-redux'
import { marked } from 'marked'
import { useParams } from 'react-router-dom'

//components
import LabelItem from '../Label/LabelItem'
import CommentMenu from './CommentMenu'
import UserControlIssue from '../NewIssue/UserControlIssue'

//custom
import { calculateTime } from '../IssueList/IssueItem'
import {
  useUpdateCommentMutation,
  useUpdateIssueMutation,
  useDeleteCommentMutation
} from '../../redux/issueApiSlice'
import { RootState } from '../../redux/store'

type PropsType = {
  id: number
  body: string
  user: string
  createTime: string
  authorAssociation?: string
  type: string
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
  type
}: PropsType) {
  const [actionMenuToggle, setActionMenuToggle] = useState(false)
  const [editTextareaToggle, setEditTexrareaToggle] = useState(false)
  const initBodyText = useRef(body)
  const { issueId } = useParams()
  const [updateComment] = useUpdateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [updateIssue] = useUpdateIssueMutation()
  const { tokenReducer } = useSelector((store: RootState) => store)
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
                <LabelItem
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
                            name: 'd1074181068',
                            repo: 'webdesign',
                            token: tokenReducer.token,
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
          <p
            className='prose'
            dangerouslySetInnerHTML={{
              __html: marked(body)
            }}></p>
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
                  name: 'd1074181068',
                  repo: 'webdesign',
                  token: tokenReducer.token,
                  commentId: id,
                  body: {
                    body: textAreaText
                  }
                })
              } else {
                updateIssue({
                  name: 'd1074181068',
                  repo: 'webdesign',
                  token: tokenReducer.token,
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
