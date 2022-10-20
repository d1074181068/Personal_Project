import {
  IssueClosedIcon,
  IssueOpenedIcon,
  SkipIcon
} from '@primer/octicons-react'

import { lightOrDark } from '../Label/HandleLabel'
import Label from '../Label/Label'

type PropsType = {
  title: string
  body: string
  labels: { name: string; bgColor: string; desc: string; id: number }[]
  number: number
  createTime: string
  stateReason: string | null
  ownerImg: string
}
function HoverTitleEffect({
  title,
  labels,
  number,
  ownerImg,
  createTime,
  body,
  stateReason
}: PropsType) {
  const date = new Date(createTime)
  return (
    <div className='absolute top-[-207px] left-[50px] z-99 w-[400px] rounded border border-solid border-borderGray bg-white'>
      <div className='border-b border-solid border-borderGray p-2'>
        <div className='my-2 flex items-center'>
          <button className='text-[14px] text-textGray hover:underline'>
            d1074181068/webdesign
          </button>
          <span className='ml-1 block text-[14px] text-textGray'>
            on {date.toString().split(' ')[1]} {date.toString().split(' ')[2]}
          </span>
        </div>

        <div className='my-1 flex items-start'>
          {stateReason === null ? (
            <IssueOpenedIcon fill={'#1a7f37'} />
          ) : stateReason === 'not_planned' ? (
            <SkipIcon fill={'#57606a'} />
          ) : (
            <IssueClosedIcon fill={'#8250df'} />
          )}
          <h3 className='whitespace-pre-wrap px-1 text-[16px]'>{title}</h3>
          <span className='text-textGray'>#{number}</span>
        </div>
        <p className='mb-2 pl-3 text-textGray'>{body}</p>
        <div className='flex items-center pl-3'>
          {labels.length !== 0 &&
            labels.map(({ name, bgColor, id }) => {
              return (
                <div className='mr-[5px] flex' key={id}>
                  <Label
                    labelName={name}
                    colorCode={`#${bgColor}`}
                    textColor={lightOrDark(bgColor)}
                  />
                </div>
              )
            })}
        </div>
      </div>
      <div className='flex items-center p-2'>
        <img
          src={ownerImg}
          alt='userImage'
          className='mr-1 h-[20px] w-[20px] rounded-circle'
        />
        <span className='whitespace-nowrap text-textGray'>
          You are assigned and were mentioned
        </span>
      </div>
    </div>
  )
}

export default HoverTitleEffect
