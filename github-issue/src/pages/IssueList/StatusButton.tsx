import React from 'react'

type PropsType = {
  icon: JSX.Element
  text: string
}

function StatusButton({ icon, text }: PropsType) {
  return (
    <button className='mr-1 flex items-center'>
      <span className='mr-[5px]'>{icon}</span>
      <span>{text}</span>
    </button>
  )
}

export default StatusButton
