import React from 'react'
import { XIcon, CheckIcon } from '@primer/octicons-react'

type PropsType = {
  setFeatureMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const assigneeArr = [
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/71813522?v=4',
    text: 'Frank'
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/71813522?v=4',
    text: 'Hippo'
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/71813522?v=4',
    text: 'Jay'
  }
]

const labelArr = [
  { color: 'FF0000', text: 'Frank', desc: 'vimvimvim' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank', desc: 'vimvimvim' }
]
function MenuDropdown({ setFeatureMenuOpen }: PropsType) {
  return (
    <>
      <div
        className='fixed top-0 left-0 right-0 bottom-0 bg-maskBlack'
        onClick={() => setFeatureMenuOpen(false)}>
        MenuDropdown
      </div>
      <div className='absolute top-[100px] left-1 right-1 h-[80%] rounded bg-white'>
        <div className='flex items-center justify-between  border-b border-solid border-borderGray p-2 text-[12px] font-medium'>
          <span>Assign up to 10 people to this issue</span>
          <button onClick={() => setFeatureMenuOpen(false)}>
            <XIcon />
          </button>
        </div>
        <div className='border-b border-solid border-borderGray p-2'>
          <input
            type='text'
            placeholder='Type or choose a user'
            className='h-[32px] w-full  rounded border border-solid border-borderGray pl-1'
          />
        </div>
        <h3 className='border-b border-solid border-borderGray bg-commonBgGray p-1 pl-[10px] text-[12px] font-medium'>
          Suggestions
        </h3>
        <ul>
          {assigneeArr.map(({ imageUrl, text }, index) => {
            return (
              <li
                className='relative flex cursor-pointer items-center border-b border-solid border-borderGray p-2 pl-5 hover:bg-hoverBlue hover:text-white'
                key={index}>
                <div className='absolute left-[18px] top-[17px]'>
                  <CheckIcon />
                </div>
                <img
                  src={imageUrl}
                  alt='userImage'
                  className='mr-1 h-[20px] w-[20px] rounded-circle'
                />
                <span className='font-medium'>{text}</span>
              </li>
            )
          })}
          {/* {labelArr.map(({ color, text, desc }, index) => {
            return (
              <li
                className='relative flex cursor-pointer flex-wrap items-center border-b border-solid border-borderGray p-2 pl-5 hover:bg-hoverBlue hover:text-white'
                key={index}>
                <div className='absolute left-[18px] top-2'>
                  <CheckIcon />
                </div>
                <span
                  style={{ background: `#${color}` }}
                  className='mr-1 block h-[14px] w-[14px] rounded-circle'
                />
                <div className='flex grow items-center justify-between font-medium'>
                  <span>{text}</span>
                  <button className='ml-[auto]'>
                    <XIcon />
                  </button>
                </div>
                {desc && <span className='w-full pt-1'>{desc}</span>}
              </li>
            )
          })} */}
        </ul>
      </div>
    </>
  )
}

export default MenuDropdown
