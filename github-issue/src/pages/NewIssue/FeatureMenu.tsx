//libraries
import React, { useState } from 'react'
import { GearIcon } from '@primer/octicons-react'

//components
import MenuDropdown from './MenuDropdown'
import LabelItem from '../Label/LabelItem'

//custom
import { lightOrDark } from '../Label/HandleLabel'

type PropsType = {
  type: string
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
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' },
  { color: 'FF0000', text: 'Frank' }
]
function FeatureMenu({ type }: PropsType) {
  const [hoverMenuStyle, setHoverMenuStyle] = useState('')
  const [featureMenuOpen, setFeatureMenuOpen] = useState(false)
  return (
    <div className='border-b border-solid border-borderGray py-2'>
      <div
        className='group mb-1 flex cursor-pointer items-center justify-between'
        onMouseOver={() => setHoverMenuStyle('rgb(9,105,218)')}
        onMouseLeave={() => setHoverMenuStyle('rgb(87,96,106)')}
        onClick={() => setFeatureMenuOpen(true)}>
        <h3 className='text-[12px] text-textGray group-hover:text-hoverBlue'>
          {type}
        </h3>
        <GearIcon fill={hoverMenuStyle ? hoverMenuStyle : 'rgb(87,96,106)'} />
      </div>
      {type === 'Assignees' &&
        assigneeArr.map(({ imageUrl, text }, index) => {
          return (
            <div className='mb-1 flex items-center' key={index}>
              <img
                src={imageUrl}
                alt='userImage'
                className='mr-[5px] h-[20px] w-[20px] rounded-circle'
              />
              <span className='cursor-pointer font-medium hover:text-hoverBlue'>
                {text}
              </span>
            </div>
          )
        })}
      {type === 'Labels' && (
        <div className='mb-1 flex flex-wrap items-center gap-1'>
          {labelArr.map(({ color, text }, index) => {
            return (
              <div className='mr-[5px] flex' key={index}>
                <LabelItem
                  labelName={text}
                  colorCode={`#${color}`}
                  textColor={lightOrDark(color)}
                />
              </div>
            )
          })}
        </div>
      )}

      <div className={`${featureMenuOpen ? 'block' : 'hidden'}`}>
        <MenuDropdown setFeatureMenuOpen={setFeatureMenuOpen} />
      </div>
    </div>
  )
}

export default FeatureMenu
