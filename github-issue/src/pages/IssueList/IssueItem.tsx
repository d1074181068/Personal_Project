import React from 'react'

type PropsType = {
  icon: JSX.Element
}

function IssueItem({ icon }: PropsType) {
  return (
    <li className='border-b border-solid border-borderGray bg-white p-3'>
      {icon}
    </li>
  )
}

export default IssueItem
