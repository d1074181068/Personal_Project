import React from 'react'
import {
  CommentIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  SkipIcon
} from '@primer/octicons-react'
import { useNavigate } from 'react-router-dom'

//components
import HoverTitleEffect from './HoverTitleEffect'
import LabelItem from '../Label/LabelItem'

//custom
import { lightOrDark } from '../Label/HandleLabel'
import { resetAllFilter } from '../../redux/querySlice'
import { useDispatch } from 'react-redux'

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
  state: string
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
  state,
  ownerImg
}: PropsType) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <li className=' relative z-[24px] flex cursor-pointer border-b border-solid border-borderGray bg-white p-2 last:rounded-br last:rounded-bl hover:bg-commonBgGray sm:border sm:border-t-0'>
      {state === 'open' ? (
        <IssueOpenedIcon fill={'#1a7f37'} />
      ) : stateReason === 'not_planned' ? (
        <SkipIcon fill={'#57606a'} />
      ) : (
        <IssueClosedIcon fill={'#8250df'} />
      )}
      <div className='ml-2 flex grow flex-col items-start md:flex-row md:flex-wrap '>
        <button
          className='group mb-1 text-[16px] font-medium hover:text-hoverBlue md:mr-1'
          onClick={() => {
            dispatch(resetAllFilter())
            navigate(`/issue/${number}`)
          }}>
          {title}
          {
            //TODO : fix hoverItem bug
            /* <div className='hidden group-hover:block'>
            <HoverTitleEffect
              title={title}
              labels={labels}
              number={number}
              createTime={createTime}
              body={body}
              stateReason={stateReason}
              ownerImg={ownerImg}
            />
          </div> */
          }
        </button>
        <div className='mb-1 flex flex-wrap gap-[3px]'>
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
                className='mr-[-8px] h-[20px] w-[20px] transition-all group-hover:mr-[0px] first:group-hover:mr-[-8px]'>
                <img
                  src={userImage}
                  alt='userImage'
                  className='rounded-circle'
                />
              </button>
            )
          })}
      </div>
      {commentsQty !== 0 && (
        <button className='ml-2 hidden h-[20px] w-[30px] items-center pt-[2px] text-center sm:flex'>
          <CommentIcon />
          <span className='ml-1'>{commentsQty}</span>
        </button>
      )}
    </li>
  )
}

export default IssueItem
