import React, { useState } from 'react'
import { CheckIcon } from '@primer/octicons-react'

type PropsType = {
  text: string
  index: number
  display: string
  setCurrentCheckFn: React.Dispatch<React.SetStateAction<number>>
}

function MobileFilterDown({
  text,
  index,
  display,
  setCurrentCheckFn
}: PropsType) {
  return (
    <button
      className=' flex w-full items-center border-0 border-b-[1px] border-solid border-borderGray py-2 pr-3 pl-2 hover:bg-commonBgGray'
      onClick={(e) => {
        e.preventDefault()
        setCurrentCheckFn(index)
      }}>
      <div className={`mr-2 ${display}`}>
        <CheckIcon />
      </div>

      {text}
    </button>
  )
}

export default MobileFilterDown
