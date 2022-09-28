import React from 'react'

type PropsType = {
  icon: JSX.Element
  text: string
  length: number
}

function StatusButton({ icon, text, length }: PropsType) {
  return (
    <button className='mr-1 flex items-center'>
      <span className='mr-[5px]'>{icon}</span>
      <span className='mr-[5px]'>{length}</span>
      <span>{text}</span>
    </button>
  )
}

export default StatusButton
