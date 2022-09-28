import React from 'react'
import { CommentIcon } from '@primer/octicons-react'
import LabelItem from '../Label/LabelItem'

//custom
import { lightOrDark } from '../Label/HandleLabel'

type PropsType = {
  icon: JSX.Element
  title: string
  labels: { name: string; bgColor: string; desc: string; id: number }[]
  number: number
  assignees: { userName: string; userImage: string }[]
  commentsQty: number
}

function IssueItem({
  icon,
  title,
  labels,
  number,
  assignees,
  commentsQty
}: PropsType) {
  return (
    <li className='flex cursor-pointer border-b border-solid border-borderGray bg-white p-2 last:rounded-br last:rounded-bl hover:bg-commonBgGray sm:border sm:border-t-0'>
      {icon}
      <div className='ml-2 flex grow flex-col items-start md:flex-row md:flex-wrap '>
        <h3 className='mb-1 text-[16px] font-medium md:mr-1'>{title}</h3>
        <div className='mb-1 flex'>
          {labels.length !== 0 &&
            labels.map(({ name, bgColor, id }) => {
              return (
                <div className='mr-1 flex' key={id}>
                  <LabelItem
                    labelName={name}
                    colorCode={`#${bgColor}`}
                    textColor={lightOrDark(bgColor)}
                  />
                </div>
              )
            })}
        </div>
        <span className='text-[12px] text-textGray md:w-full'>
          #{number} opened 10 days ago by Frank
        </span>
      </div>
      <div className='group mr-2 hidden h-[20px] transition-all sm:flex'>
        {assignees.length !== 0 &&
          assignees.map(({ userImage }, index) => {
            return (
              <button
                key={index}
                style={{ order: assignees.length - index }}
                className='ml-[-8px] h-[20px] w-[20px] transition-all group-hover:ml-0'
              >
                <img
                  src={userImage}
                  alt='userImage'
                  className=' rounded-circle'
                />
              </button>
            )
          })}
      </div>
      <button className='ml-3 hidden h-[20px] items-center pt-[2px] sm:flex'>
        <CommentIcon />
        <span className='ml-1'>{commentsQty}</span>
      </button>
    </li>
  )
}

export default IssueItem
