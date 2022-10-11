//libraries
import React, { useState } from 'react'
import { GearIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'

//components
import LabelItem from '../Label/LabelItem'
import DesktopPopMenu from '../IssueList/PopMenu'

//custom
import { lightOrDark } from '../Label/HandleLabel'
import { MenuContentType } from '../IssueList/PopMenu'
import { RootState } from '../../redux/store'
import { handleAssignee } from '../../redux/issueSlice'

type PropsType = {
  type: string
  organizeDataFn: () => void
  menuContent?: MenuContentType
  menuPos: string
}

function FeatureMenu({
  type,
  organizeDataFn,
  menuContent,
  menuPos
}: PropsType) {
  const [featureMenuOpen, setFeatureMenuOpen] = useState(false)
  const { issueReducer } = useSelector((store: RootState) => store)
  const dispatch = useDispatch()
  return (
    <div className='border-b border-solid border-borderGray py-2'>
      <div
        className={`${
          featureMenuOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 right-0 bottom-0 bg-maskBlack md:bg-[transparent]`}
        onClick={() => setFeatureMenuOpen(false)}></div>
      <div
        className='group relative mb-1 flex cursor-pointer items-center justify-between'
        onClick={() => {
          organizeDataFn()
          setFeatureMenuOpen(true)
        }}>
        <h3 className='text-[12px] text-textGray group-hover:text-hoverBlue'>
          {type}
        </h3>
        <div className='group-hover:text-hoverBlue'>
          <GearIcon />
        </div>
        <DesktopPopMenu
          menuOpenStatus={featureMenuOpen}
          setMenuStatusFn={setFeatureMenuOpen}
          menuContent={menuContent}
          left={menuPos}
          breakPoint={'md'}
        />
      </div>
      {type === 'Assignees' && (
        <div className='text-[12px] text-textGray'>
          {issueReducer.assignees.length === 0 ? (
            <div className='text-[12px] text-textGray'>
              No one -
              <button
                className=' hover:text-hoverBlue'
                onClick={() =>
                  dispatch(
                    handleAssignee({
                      text: 'd1074181068',
                      imageUrl:
                        'https://avatars.githubusercontent.com/u/71813522?v=4'
                    })
                  )
                }>
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
