import React from 'react'

type PropsType = {
  type: string
  number: string
}
function emoji(type: string) {
  if (type === '+1') return '👍'
  if (type === '-1') return '👎'
  if (type === 'laugh') return '😄'
  if (type === 'hooray') return '🎉'
  if (type === 'confused') return '😕'
  if (type === 'heart') return '❤️'
  if (type === 'rocket') return '🚀'
  if (type === 'eyes') return '👀'
}
function Emoji({ type, number }: PropsType) {
  return (
    <li className='mr-1 h-[26px] cursor-pointer rounded-[100px] border border-solid border-[rgb(9,105,218)] bg-[rgb(221,244,255)] px-1 text-[12px] leading-[26px] text-[rgb(9,105,218)]'>
      {emoji(type)} <span>{number}</span>
    </li>
  )
}

export default Emoji
