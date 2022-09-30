import React, { useState } from 'react'
import {
  SearchIcon,
  LinkExternalIcon,
  XIcon,
  TriangleDownIcon
} from '@primer/octicons-react'

import Dropdown from '../../components/Content/Dropdown'
import MobileFilterDown from './MobileFilterDown'

type PropsType = {
  headerText: string
}
const filterDropdownText = [
  '',
  'Your issues',
  'Everything assigned to you',
  'Everything mentioning you'
]
const mobilefFilterDropdownText = [
  'Your issues',
  'Everything assigned to you',
  'Everything mentioning you'
]
function Filters({ headerText }: PropsType) {
  const [filterListOpen, setFilterListOpen] = useState(false)
  const [mobileFilterCurrentCheck, setMobileFilterCurrentCheck] = useState(0)

  return (
    <div className='mt-3 w-full md:mt-0'>
      <div className='mb-3 flex md:mb-0'>
        <div className='hidden h-[35px] whitespace-nowrap rounded rounded-tr-none rounded-br-none border border-solid border-borderGray bg-commonBgGray px-2 pt-[9px] pb-[5px] md:block'>
          <Dropdown
            text='Filters'
            dropdownText={filterDropdownText}
            top={'30px'}
            left={'-17px'}
          />
        </div>
        <button
          className='block h-[35px] whitespace-nowrap rounded rounded-tr-none rounded-br-none border border-solid border-borderGray bg-commonBgGray py-[5px] px-2 md:hidden'
          onClick={() => setFilterListOpen(true)}>
          Filters
          <TriangleDownIcon />
        </button>
        <div className='relative w-full'>
          <input
            type='text'
            className='h-[35px] w-full rounded rounded-tl-none rounded-bl-none border border-l-0 border-borderGray bg-commonBgGray pl-4 text-textGray'
            placeholder='Search all issues'
            defaultValue='is:issue is:open'
          />
          <div className='absolute left-[8px] top-[9px]'>
            <SearchIcon fill={'rgb(87,96,106)'} />
          </div>
        </div>
      </div>
      <div
        className={`${
          filterListOpen ? 'block' : 'hidden'
        } fixed top-0 bottom-0 left-0 right-0 z-199 bg-maskBlack px-2  md:hidden`}>
        <div className=' absolute top-[33%] left-2 right-2 rounded-lg bg-white '>
          <div className='flex items-center justify-between rounded-tl-lg rounded-tr-lg border-b-[1px] border-solid border-borderGray bg-white py-2 px-2'>
            <h3>{headerText}</h3>
            <a
              href='/'
              onClick={(e) => {
                setFilterListOpen(false)
                e.preventDefault()
              }}>
              <XIcon />
            </a>
          </div>

          {mobilefFilterDropdownText.map((text, index) => {
            return (
              <MobileFilterDown
                text={text}
                index={index}
                display={
                  mobileFilterCurrentCheck === index ? 'visible' : 'invisible'
                }
                setCurrentCheckFn={setMobileFilterCurrentCheck}
                key={index}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Filters
