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
  'Open issues and pull requests',
  'Your issues',
  'Your pull requests',
  'Everything assigned to you',
  'Everything mentioning you',
  'View advanced search syntax'
]
const mobilefFilterDropdownText = [
  'Open issues and pull requests',
  'Your issues',
  'Your pull requests',
  'Everything assigned to you',
  'Everything mentioning you',
  'View advanced search syntax'
]
function Filters({ headerText }: PropsType) {
  const [filterListOpen, setFilterListOpen] = useState(false)
  const [mobileFilterCurrentCheck, setMobileFilterCurrentCheck] = useState(0)

  return (
    <div className='w-full mt-3 md:mt-0'>
      <div className='mb-3 md:mb-0 flex'>
        <div className='hidden md:block h-[35px] whitespace-nowrap rounded rounded-tr-none rounded-br-none border border-solid border-borderGray bg-commonBgGray pt-[9px] pb-[5px] px-2'>
          <Dropdown
            text='Filters'
            dropdownText={filterDropdownText}
            top={'30px'}
            left={'-17px'}
          />
        </div>
        <button
          className='block md:hidden h-[35px] whitespace-nowrap rounded rounded-tr-none rounded-br-none border border-solid border-borderGray bg-commonBgGray py-[5px] px-2'
          onClick={() => setFilterListOpen(true)}
        >
          Filters
          <TriangleDownIcon />
        </button>
        <div className='relative w-full'>
          <input
            type='text'
            className='h-[35px] w-full rounded rounded-tl-none rounded-bl-none border border-l-0 border-borderGray bg-commonBgGray pl-4'
            placeholder='Search all issues'
          />
          <div className='absolute left-[8px] top-[9px]'>
            <SearchIcon fill={'rgb(87,96,106)'} />
          </div>
        </div>
      </div>
      <div
        className={`${
          filterListOpen ? 'block' : 'hidden'
        }  fixed top-0 bottom-0 left-0 right-0 z-199 bg-maskBlack  px-2`}
      >
        <div className=' absolute top-[33%] left-2 right-2 rounded-lg bg-white '>
          <div className='flex justify-between items-center rounded-tl-lg border-b-[1px] border-solid border-borderGray rounded-tr-lg bg-white py-2 px-2'>
            <h3>{headerText}</h3>
            <a
              href='/'
              onClick={(e) => {
                setFilterListOpen(false)
                e.preventDefault()
              }}
            >
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
          <button className='flex w-full items-center border-b-0 rounded-br-lg rounded-bl-lg hover:bg-commonBgGray py-2 pl-2'>
            <LinkExternalIcon className='mr-1' />
            View advanced search syntax
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filters
