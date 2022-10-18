//libraries
import React, { useRef, useState } from 'react'
import { GearIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
//components
import LabelItem from '../Label/LabelItem'
import PopupMenu from '../IssueList/PopupMenu'

//custom
import { lightOrDark } from '../Label/HandleLabel'
import { MenuContentType } from '../IssueList/PopupMenu'
import { RootState } from '../../redux/store'
import { handleAssignee } from '../../redux/issueSlice'
import { useUpdateIssueMutation } from '../../redux/issueApiSlice'
import { useParams } from 'react-router-dom'

type PropsType = {
  type: string
  title: string
  organizeDataFn: () => void
  menuContent?: MenuContentType
  menuPos?: string
  updateOrigin: boolean
  checked?: boolean
  clearAssignee?: boolean
}

function FeatureMenu({
  title,
  type,
  organizeDataFn,
  menuContent,
  menuPos,
  updateOrigin,
  checked,
  clearAssignee
}: PropsType) {
  const repo = sessionStorage.getItem('repo')
  const userName = localStorage.getItem('userName')
  const userPhoto = JSON.parse(
    localStorage.getItem('supabase.auth.token') as string
  )?.currentSession.user.identities[0].identity_data.avatar_url
  const [featureMenuOpen, setFeatureMenuOpen] = useState(false)
  const { issueReducer, userReducer } = useSelector((store: RootState) => store)
  const [updateIssue] = useUpdateIssueMutation()
  const previousAssigneesArr = useRef<{ text: string; imageUrl: string }[]>()
  const previousLabelsArr = useRef<{ text: string; colorCode: string }[]>()
  const { issueId } = useParams()
  const dispatch = useDispatch()
  return (
    <div className='border-b border-solid border-borderGray py-2'>
      <div
        className={`${
          featureMenuOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 right-0 bottom-0 z-[399] bg-maskBlack md:bg-[transparent]`}
        onClick={
          type === 'other'
            ? () => {}
            : () => {
                if (updateOrigin) {
                  if (
                    !_.isEqual(
                      issueReducer.assignees,
                      previousAssigneesArr.current
                    ) ||
                    !_.isEqual(
                      issueReducer.labelName,
                      previousLabelsArr.current
                    )
                  ) {
                    updateIssue({
                      name: userName ? userName : '',
                      repo: repo ? repo : '',
                      token: userReducer.token,
                      issueNumber: issueId as string,
                      body: {
                        assignees: issueReducer.assignees.map(
                          ({ text }) => text
                        ),
                        labels: issueReducer.labelName.map(({ text }) => text)
                      }
                    })
                  }
                }
                setFeatureMenuOpen(false)
              }
        }></div>
      <div
        className='group relative mb-1 flex cursor-pointer items-center justify-between'
        onClick={
          type === 'other'
            ? () => {}
            : () => {
                organizeDataFn()
                previousAssigneesArr.current = issueReducer.assignees
                previousLabelsArr.current = issueReducer.labelName
                setFeatureMenuOpen(true)
              }
        }>
        <h3 className='text-[12px] text-textGray group-hover:text-hoverBlue'>
          {title}
        </h3>
        <div className='group-hover:text-hoverBlue'>
          <GearIcon />
        </div>
        {type === 'other' ? (
          <></>
        ) : (
          <PopupMenu
            clearAssignee={clearAssignee}
            withDismissButton={false}
            menuOpenStatus={featureMenuOpen}
            setMenuStatusFn={setFeatureMenuOpen}
            menuContent={menuContent}
            left={menuPos}
            checked={checked}
            breakPoint={'md'}
          />
        )}
      </div>
      {type !== 'Labels' && type !== 'Assignees' && (
        <div className='text-[12px] text-textGray'>None yet</div>
      )}
      {type === 'Assignees' && (
        <div className='text-[12px] text-textGray'>
          {issueReducer.assignees.length === 0 ? (
            <div className='text-[12px] text-textGray'>
              No one -
              <button
                className=' hover:text-hoverBlue'
                onClick={() => {
                  dispatch(
                    handleAssignee({
                      text: userName || '',
                      imageUrl: userPhoto
                    })
                  )
                  if (updateOrigin) {
                    updateIssue({
                      name: userName ? userName : '',
                      repo: repo ? repo : '',
                      token: userReducer.token,
                      issueNumber: issueId as string,
                      body: {
                        assignees: [`${userName || ''}`]
                      }
                    })
                  }
                }}>
                assign yourself
              </button>
            </div>
          ) : (
            issueReducer.assignees.map(({ imageUrl, text }, index) => {
              return (
                <div className='mb-1 flex items-center' key={index}>
                  <img
                    src={imageUrl}
                    alt='userImage'
                    className='mr-[5px] h-[20px] w-[20px] rounded-circle'
                  />
                  <span className='cursor-pointer font-medium hover:text-hoverBlue'>
                    {text}
                  </span>
                </div>
              )
            })
          )}
        </div>
      )}
      {type === 'Labels' && (
        <div className='mb-1 flex flex-wrap items-center gap-[4px]'>
          {issueReducer.labelName.length === 0 ? (
            <div className='text-[12px] text-textGray'>None yet</div>
          ) : (
            issueReducer.labelName.map(({ text, colorCode }, index) => {
              return (
                <div className='mr-[2px] flex' key={index}>
                  <LabelItem
                    labelName={text}
                    colorCode={colorCode}
                    textColor={lightOrDark(colorCode)}
                  />
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default FeatureMenu
