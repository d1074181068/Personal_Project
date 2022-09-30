import React from 'react'
import { XIcon } from '@primer/octicons-react'

import { useDispatch, useSelector } from 'react-redux'
import { getLabel } from '../../redux/reducer'

export type MenuContentType = {
  title: string
  inputPlaceholder?: string
  commonAction?: string
  content?: {
    icon?: string
    text?: string
    desc?: string
    userName?: string
    userImage?: string
  }[]
  sortTextArr?: string[]
}

type PropsType = {
  top?: string
  left?: string
  right?: string
  bottom?: string
  menuOpenStatus: boolean
  setMenuStatusFn: React.Dispatch<React.SetStateAction<boolean>>
  menuContent?: MenuContentType
}

function DesktopPopMenu({
  menuOpenStatus,
  setMenuStatusFn,
  top,
  left,
  right,
  bottom,
  menuContent
}: PropsType) {
  const dispatch = useDispatch()
  return (
    <>
      {menuContent && (
        <div
          className={`fixed sm:absolute ${
            menuOpenStatus ? 'block' : 'hidden'
          } ${top} ${left} ${right} ${bottom} top-[20px] right-1 left-1 z-[200] max-h-[480px] overflow-y-auto rounded-lg border border-solid border-borderGray bg-white sm:w-[300px]`}>
          <div className='flex justify-between rounded-tl-lg rounded-tr-lg border-b border-solid border-borderGray px-3 py-2'>
            <h3 className='font-medium'>{menuContent.title}</h3>
            <button onClick={() => setMenuStatusFn(false)}>
              <XIcon />
            </button>
          </div>
          {menuContent.inputPlaceholder && (
            <div className='border-b border-solid border-borderGray p-2'>
              <input
                type='text'
                placeholder={menuContent.inputPlaceholder}
                className='h-[32px] w-full rounded border border-solid border-borderGray pl-2'
              />
            </div>
          )}

          {menuContent.commonAction && (
            <button className='w-full border-0 border-b border-solid border-borderGray py-3 pl-4 text-left font-medium hover:bg-commonBgGray'>
              {menuContent.commonAction}
            </button>
          )}
          {menuContent.sortTextArr &&
            menuContent.sortTextArr.map((text, index) => {
              return (
                <button
                  className='flex w-full border-0 border-b border-solid border-borderGray py-2 pl-4 text-left hover:bg-commonBgGray'
                  key={index}>
                  {text}
                </button>
              )
            })}
          {menuContent.content &&
            menuContent.content.map(
              ({ icon, text, desc, userImage, userName }, index) => {
                return (
                  <button
                    className='flex w-full border-0 border-b border-solid border-borderGray py-2 pl-4 text-left hover:bg-commonBgGray'
                    key={index}
                    onClick={() => {
                      dispatch(getLabel(text as string))
                    }}>
                    {icon && (
                      <span
                        style={{ backgroundColor: icon }}
                        className={`mr-1 block h-[14px] w-[14px] rounded-circle ${icon}`}></span>
                    )}
                    {userImage && (
                      <img
                        src={userImage}
                        alt='userImage'
                        className={`mr-1 block h-[14px] w-[14px] rounded-circle `}
                      />
                    )}
                    <span className='font-medium'>
                      {text ? text : userName}
                      {desc && (
                        <span className='font-normal'>
                          <br />
                          <br /> {desc}
                        </span>
                      )}
                    </span>
                  </button>
                )
              }
            )}
        </div>
      )}
    </>
  )
}

export default DesktopPopMenu
