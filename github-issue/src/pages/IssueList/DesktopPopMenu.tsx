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
  top: string
  left: string
  menuOpenStatus: boolean
  setMenuStatusFn: React.Dispatch<React.SetStateAction<boolean>>
}

function DesktopPopMenu({
  menuOpenStatus,
  setMenuStatusFn,
  top,
  left
}: PropsType) {
  return (
    <div
      className={`absolute ${top} ${left} z-[200] hidden max-h-[480px] w-[300px]  overflow-y-auto rounded-lg border border-solid border-borderGray bg-white sm:${
        menuOpenStatus ? 'block' : 'hidden'
      } `}
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
  )
}

export default DesktopPopMenu
