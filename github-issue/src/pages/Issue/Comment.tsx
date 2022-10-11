//libraries
import React, { useState } from 'react'
import { SmileyIcon, KebabHorizontalIcon } from '@primer/octicons-react'

//components
import LabelItem from '../Label/LabelItem'
import CommentMenu from './CommentMenu'

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
function Comment() {
  const [actionMenuToggle, setActionMenuToggle] = useState(false)
  return (
    <div className='rounded border border-solid border-[rgba(84,174,255,0.4)]'>
      <header className='flex justify-between border-b border-solid border-[rgba(84,174,255,0.4)] bg-[rgb(221,244,255)] p-2'>
        <span className='font-medium text-textBlack'>
          d1074181068
          <span className='ml-[5px] text-textGray'>commented 8 hours ago</span>
        </span>
        <div className='flex items-center text-[12px]'>
          <div className='mr-[5px] hidden sm:block'>
            <LabelItem
              labelName={'Owner'}
              colorCode={'transparent'}
              border={'1px solid rgba(84,174,255,0.4)'}
              textColor={'#57606a'}
              padding={'1px 5px'}
            />
          </div>
          <div className='mr-1  hidden sm:block'>
            <LabelItem
              labelName={'Author'}
              colorCode={'transparent'}
              border={'1px solid rgba(84,174,255,0.4)'}
              textColor={'#57606a'}
              padding={'1px 5px'}
            />
          </div>
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
              menuContent={issueMenuContentArr}
              actionMenuToggle={actionMenuToggle}
            />
            <div
              className={`${
                actionMenuToggle ? 'block' : 'hidden'
              } fixed top-0 left-0 right-0 bottom-0`}
              onClick={() => setActionMenuToggle(false)}></div>
          </div>
        </div>
      </header>
      <main className='m-2'>
        <p>dsfhjgghjghjgh</p>
      </main>
    </div>
  )
}

export default Comment
