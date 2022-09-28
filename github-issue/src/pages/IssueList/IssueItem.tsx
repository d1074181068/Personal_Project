import React from 'react'
import { CommentIcon } from '@primer/octicons-react'
import LabelItem from '../Label/LabelItem'
type PropsType = {
  icon: JSX.Element
}

function IssueItem({ icon }: PropsType) {
  return (
    <li className='flex border-b border-solid border-borderGray bg-white p-2 last:rounded-br last:rounded-bl sm:border sm:border-t-0'>
      {icon}
      <div className='ml-2 flex grow flex-col items-start md:flex-row md:flex-wrap '>
        <h3 className='mb-1 text-[16px] font-medium md:mr-1'>issue test</h3>
        <div className='mb-1 flex'>
          <div className='mr-1 flex'>
            <LabelItem
              labelName={'Frank'}
              colorCode={'#FF0000'}
              textColor={'#FFFFFF'}
            />
          </div>
          <div className='mr-1 flex'>
            <LabelItem
              labelName={'Frank'}
              colorCode={'#FF0000'}
              textColor={'#FFFFFF'}
            />
          </div>
        </div>
        <span className='text-[12px] text-textGray md:w-full'>
          #8 opened 10 days ago by Frank
        </span>
      </div>
      <div className='group mr-2 hidden h-[20px] transition-all sm:flex'>
        <button className='ml-[-10px] h-[20px] w-[20px] transition-all group-hover:ml-0'>
          <img
            src='https://avatars.githubusercontent.com/u/71813522?s=40&v=4'
            alt='user'
            className=' rounded-circle'
          />
        </button>
        <button className='ml-[-10px] h-[20px] w-[20px] transition-all group-hover:ml-0'>
          <img
            src='https://avatars.githubusercontent.com/u/71813522?s=40&v=4'
            alt='user'
            className=' rounded-circle'
          />
        </button>
        <button className='ml-[-10px] h-[20px] w-[20px] transition-all group-hover:ml-0'>
          <img
            src='https://avatars.githubusercontent.com/u/71813522?s=40&v=4'
            alt='user'
            className=' rounded-circle'
          />
        </button>
        <button className='ml-[-10px] h-[20px] w-[20px] transition-all group-hover:ml-0'>
          <img
            src='https://avatars.githubusercontent.com/u/71813522?s=40&v=4'
            alt='user'
            className=' rounded-circle'
          />
        </button>
        <button className='ml-[-10px] h-[20px] w-[20px] transition-all group-hover:ml-0'>
          <img
            src='https://avatars.githubusercontent.com/u/71813522?s=40&v=4'
            alt='user'
            className=' rounded-circle'
          />
        </button>
        <button className='ml-[-10px] h-[20px] w-[20px] transition-all group-hover:ml-0'>
          <img
            src='https://avatars.githubusercontent.com/u/71813522?s=40&v=4'
            alt='user'
            className=' rounded-circle'
          />
        </button>
      </div>
      <button className='ml-3 hidden h-[20px] items-center pt-[2px] sm:flex'>
        <CommentIcon />
        <span className='ml-1'>6</span>
      </button>
    </li>
  )
}

export default IssueItem
