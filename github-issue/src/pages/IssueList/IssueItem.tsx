import React from 'react'
import {
  CommentIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  SkipIcon
} from '@primer/octicons-react'
import LabelItem from '../Label/LabelItem'

//components
import HoverTitleEffect from './HoverTitleEffect'

//custom
import { lightOrDark } from '../Label/HandleLabel'

type PropsType = {
  title: string
  body: string
  labels: { name: string; bgColor: string; desc: string; id: number }[]
  number: number
  assignees: { userName: string; userImage: string }[]
  commentsQty: number
  createBy: string
  createTime: string
  stateReason: string | null
  ownerImg: string
}

export function calculateTime(createTime: string): string {
  const currentTime = Date.now()
  const inputTime = new Date(createTime)
  const timeLag = currentTime - inputTime.getTime()
  if (Math.floor(timeLag / (12 * 30 * 24 * 3600 * 1000)) > 0) {
    return `${Math.floor(timeLag / (12 * 30 * 24 * 3600 * 1000))} years`
  }
  if (Math.floor(timeLag / (30 * 24 * 3600 * 1000)) > 0) {
    return `${Math.floor(timeLag / (30 * 24 * 3600 * 1000))} months`
  }
  if (Math.floor(timeLag / (24 * 3600 * 1000)) > 0) {
    return `${Math.floor(timeLag / (24 * 3600 * 1000))} days`
  }
  if (Math.floor(timeLag / (3600 * 1000)) > 0) {
    return `${Math.floor(timeLag / (3600 * 1000))} hours`
  }
  if (Math.floor(timeLag / (60 * 1000)) > 0) {
    return `${Math.floor(timeLag / (60 * 1000))} minutes`
  }
  if (Math.floor(timeLag / 1000) > 0) {
    return `${Math.floor(timeLag / 1000)} seconds`
  }
  return ''
}

function IssueItem({
  title,
  labels,
  number,
  assignees,
  commentsQty,
  createBy,
  createTime,
  body,
  stateReason,
  ownerImg
}: PropsType) {
  return (
    <li className=' relative flex cursor-pointer border-b border-solid border-borderGray bg-white p-2 last:rounded-br last:rounded-bl hover:bg-commonBgGray sm:border sm:border-t-0'>
      {stateReason === null ? (
        <IssueOpenedIcon fill={'#1a7f37'} />
      ) : stateReason === 'not_planned' ? (
        <SkipIcon fill={'#57606a'} />
      ) : (
        <IssueClosedIcon fill={'#8250df'} />
      )}
      <div className='ml-2 flex grow flex-col items-start md:flex-row md:flex-wrap '>
        <div className='group mb-1 text-[16px] font-medium md:mr-1'>
          {title}
          <div className='hidden group-hover:block'>
            <HoverTitleEffect
              title={title}
              labels={labels}
              number={number}
              createTime={createTime}
              body={body}
              stateReason={stateReason}
              ownerImg={ownerImg}
            />
          </div>
        </div>
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
          #{number} opened {calculateTime(createTime)} ago by {createBy}
        </span>
      </div>
      <div className='group mr-2 hidden h-[20px] transition-all sm:flex'>
        {assignees.length !== 0 &&
          assignees.map(({ userImage }, index) => {
            return (
              <button
                key={index}
                style={{ order: assignees.length - index }}
                className='ml-[-8px] h-[20px] w-[20px] transition-all group-hover:ml-0'>
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
