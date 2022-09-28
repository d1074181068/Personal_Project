import React from 'react'
import { XIcon } from '@primer/octicons-react'

const menuContent = {
  title: 'Filter by label',
  inputPlaceholder: 'Filter labels',
  commonAction: 'Unlabeled',
  content: [
    { icon: 'bg-[#FF0000]', text: 'Frank', desc: 'Frank is coming' },
    { icon: 'bg-[#008672]', text: 'FrankFrank', desc: '' },
    { icon: 'bg-[#D876E3]', text: 'Knarf', desc: 'Knarf is coming' },
    { icon: 'bg-[#E4E669]', text: 'KanrfKanrf', desc: 'tailwind' },
    { icon: 'bg-[#FF0000]', text: 'Frank', desc: 'Frank is coming' },
    { icon: 'bg-[#008672]', text: 'FrankFrank', desc: '' },
    { icon: 'bg-[#79BAEC]', text: 'Knarf', desc: 'Knarf is coming' },
    { icon: 'bg-[#E4E669]', text: 'KanrfKanrf', desc: 'tailwind' },
    { icon: 'bg-[#FF0000]', text: 'Frank', desc: 'Frank is coming' },
    { icon: 'bg-[#79BAEC]', text: 'Frank', desc: 'Frank is coming' }
  ]
}
type PropsType = {
  menuOpenStatus: boolean
  setMenuStatusFn: React.Dispatch<React.SetStateAction<boolean>>
}

function MobilePopMenu({ menuOpenStatus, setMenuStatusFn }: PropsType) {
  return (
    <>
      <div
        className={`${
          menuOpenStatus ? 'block' : 'hidden'
        } fixed top-0 bottom-0 left-0 right-0 z-199 bg-maskBlack px-2  sm:hidden`}
        onClick={() => setMenuStatusFn(false)}
      ></div>
      <div
        className={`absolute ${
          menuOpenStatus ? 'block' : 'hidden'
        }  top-[20px] left-2 right-2 z-199 h-4/5 overflow-y-auto rounded-lg bg-white  sm:hidden`}
      >
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

        {menuContent.content.map(({ icon, text, desc }, index) => {
          return (
            <button
              className='flex w-full border-0 border-b border-solid border-borderGray py-2 pl-4 text-left hover:bg-commonBgGray'
              key={index}
            >
              <span
                className={`mr-1 block h-[14px] w-[14px] rounded-circle ${icon}`}
              ></span>
              <span className='font-medium'>
                {text}
                {desc && (
                  <span className='font-normal'>
                    <br />
                    <br /> {desc}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}

export default MobilePopMenu
