import React, { useEffect, useState } from 'react'
import { XIcon, CheckIcon } from '@primer/octicons-react'

import { useDispatch, useSelector } from 'react-redux'
import {
  updateAssigneeUser,
  resetLabelFilterText,
  sortIssue
} from '../../redux/querySlice'
import { RootState } from '../../redux/store'
import { resetAssignees } from '../../redux/issueSlice'

export type MenuContentType = {
  type?: string
  title: string
  inputPlaceholder?: string
  commonAction?: string
  content?: {
    icon?: string
    text?: string
    desc?: string
    userName?: string
    userImage?: string
  }[]
  clickFn?: (argObj: {
    text?: string
    icon?: string
    userName?: string
    userImage?: string
  }) => void
  sortTextArr?: { text: string; query: string }[]
}

type PropsType = {
  top?: string
  left?: string
  right?: string
  bottom?: string
  breakPoint?: string
  menuOpenStatus: boolean
  withDismissButton: boolean
  setMenuStatusFn: React.Dispatch<React.SetStateAction<boolean>>
  menuContent?: MenuContentType
  checked?: boolean
  clearAssignee?: boolean
}

function PopupMenu({
  menuOpenStatus,
  setMenuStatusFn,
  withDismissButton,
  breakPoint,
  top,
  left,
  right,
  bottom,
  menuContent,
  checked,
  clearAssignee
}: PropsType) {
  const dispatch = useDispatch()
  const { queryReducer, issueReducer } = useSelector(
    (store: RootState) => store
  )
  const [searchInputText, setSearchInputText] = useState('')
  useEffect(() => {
    if (menuOpenStatus) {
      setSearchInputText('')
    }
  }, [menuOpenStatus])

  return (
    <>
      {menuContent && (
        <div
          className={`fixed ${
            breakPoint === 'md' ? 'md:absolute' : 'sm:absolute'
          } ${
            menuOpenStatus ? 'block' : 'hidden'
          } ${top} ${left} ${right} ${bottom} top-[20px] right-1 left-1 z-[400] rounded-lg border border-solid border-borderGray bg-white ${
            breakPoint === 'md' ? 'md:w-[300px]' : 'sm:w-[300px]'
          }`}>
          <div className='flex items-center justify-between rounded-tl-lg rounded-tr-lg border-b border-solid border-borderGray px-3 py-2'>
            <h3 className='text-[12px] font-medium'>{menuContent.title}</h3>
            <button
              className={`${withDismissButton ? 'block' : 'hidden'}`}
              onClick={(e) => {
                e.stopPropagation()
                setMenuStatusFn(false)
              }}>
              <XIcon />
            </button>
          </div>
          {menuContent.inputPlaceholder && (
            <div className='border-b border-solid border-borderGray p-2'>
              <input
                type='text'
                placeholder={menuContent.inputPlaceholder}
                value={menuOpenStatus ? searchInputText : ''}
                className='h-[32px] w-full rounded border border-solid border-borderGray pl-2'
                onChange={(e) => setSearchInputText(e.target.value)}
              />
            </div>
          )}
          {clearAssignee && (
            <button
              className='flex w-full items-center border-0 border-b border-solid border-borderGray py-1 pl-4 text-left text-[12px] font-medium hover:bg-commonBgGray'
              onClick={() => dispatch(resetAssignees())}>
              <div className='mr-1'>
                <XIcon />
              </div>
              Clear assignees
            </button>
          )}
          {menuContent.commonAction && (
            <button
              className='w-full border-0 border-b border-solid border-borderGray py-2 pl-4 text-left font-medium hover:bg-commonBgGray'
              onClick={() => {
                dispatch(
                  menuContent.type === 'labels'
                    ? resetLabelFilterText()
                    : dispatch(updateAssigneeUser(''))
                )
                setMenuStatusFn(false)
              }}>
              {menuContent.commonAction}
            </button>
          )}
          {menuContent.sortTextArr &&
            menuContent.sortTextArr.map(({ text, query }, index) => {
              return (
                <div key={index} className='relative'>
                  <button
                    className={`${
                      queryReducer.sortIssue === query
                        ? 'font-medium'
                        : 'font-normal'
                    } flex w-full border-0 border-b border-solid border-borderGray py-2 pl-4 text-left hover:bg-commonBgGray`}
                    onClick={() => {
                      dispatch(sortIssue(query))
                      setMenuStatusFn(false)
                    }}>
                    {text}
                  </button>
                  <div
                    className={`${
                      queryReducer.sortIssue === query ? 'block' : 'hidden'
                    } absolute left-[10px] top-[13px]`}>
                    <CheckIcon />
                  </div>
                </div>
              )
            })}
          <div className='max-h-[480px] overflow-y-auto'>
            {menuContent.content &&
              menuContent.content.map(
                ({ icon, text, desc, userImage, userName }, index) => {
                  return (
                    <div className='relative' key={index}>
                      <button
                        className={`${
                          searchInputText?.trim() === ''
                            ? 'flex'
                            : text
                                ?.toUpperCase()
                                ?.includes(searchInputText.toUpperCase()) ||
                              desc
                                ?.toUpperCase()
                                ?.includes(searchInputText.toUpperCase()) ||
                              userName
                                ?.toUpperCase()
                                ?.includes(searchInputText.toUpperCase())
                            ? 'flex'
                            : 'hidden'
                        }  w-full border-0 border-b ${
                          index ===
                          (((
                            menuContent.content as {
                              icon?: string
                              text?: string
                              desc?: string
                              userName?: string
                              userImage?: string
                            }[]
                          ).length - 1) as number)
                            ? 'border-b-0'
                            : ''
                        } border-solid border-borderGray py-2 pl-4 text-left hover:bg-commonBgGray`}
                        onClick={(e) => {
                          if (menuContent.clickFn) {
                            e.stopPropagation()
                            let argObj = {}
                            if (text) {
                              argObj = { text, colorCode: icon }
                            } else {
                              argObj = { imageUrl: userImage, text: userName }
                            }
                            menuContent.clickFn(argObj)
                            setSearchInputText('')
                          }
                        }}>
                        <div
                          className={`${
                            queryReducer.labelName.includes(text as string)
                              ? 'block'
                              : queryReducer.assigneeUser === userName
                              ? 'block'
                              : issueReducer.labelName.find(
                                  (item) => item.text === text
                                )
                              ? 'block'
                              : issueReducer.assignees.find(
                                  (item) => item.text === userName
                                )
                              ? 'block'
                              : checked
                              ? 'block'
                              : 'hidden'
                          }  absolute left-[10px] top-[13px]`}>
                          <CheckIcon />
                        </div>
                        {icon && (
                          <span
                            style={{
                              backgroundColor: icon,
                              border:
                                icon.toUpperCase() === '#FFFFFF'
                                  ? '1px solid rgb(191,191,191)'
                                  : 'none'
                            }}
                            className={`mr-1 block min-h-[14px] min-w-[14px] rounded-circle`}></span>
                        )}
                        {userImage && (
                          <img
                            src={userImage}
                            alt='userImage'
                            className={`mr-1 block h-[14px] w-[14px] rounded-circle `}
                          />
                        )}
                        <span className='font-medium'>
                          {text ? text : userName}
                          {desc && (
                            <span className='mt-1 block font-normal'>
                              {desc}
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  )
                }
              )}
          </div>
        </div>
      )}
    </>
  )
}

export default PopupMenu
