//Library
import { SearchIcon, TriangleDownIcon, XIcon } from '@primer/octicons-react'
import React, { useState } from 'react'

//components
import FilterDropDown from './FilterDropDown'

type PropsType = {
  headerText: string
  inputText: string
  setFilterInputText: React.Dispatch<React.SetStateAction<string>>
}
const filterDropdownText = [
  'Your issues',
  'Everything assigned to you',
  'Everything mentioning you'
]
function Filters({ headerText, inputText, setFilterInputText }: PropsType) {
  const [filterListOpen, setFilterListOpen] = useState(false)
  const [mobileFilterCurrentCheck, setMobileFilterCurrentCheck] = useState(-1)

  return (
    <div className='mt-3 w-full md:mt-0'>
      <div className='relative mb-3 flex md:mb-0'>
        <button
          className=' h-[35px] whitespace-nowrap rounded rounded-tr-none rounded-br-none border border-solid border-borderGray bg-commonBgGray py-[5px] px-2'
          onClick={() => setFilterListOpen(true)}>
          Filters
          <TriangleDownIcon />
        </button>

        <div
          className={`${
            filterListOpen ? 'block' : 'hidden'
          } absolute top-[23%] left-2 right-2 z-199 rounded-lg border border-solid border-borderGray bg-white sm:top-[40px] sm:left-0 sm:right-[unset] sm:w-[300px]`}>
          <div className='flex items-center justify-between rounded-tl-lg rounded-tr-lg border-b-[1px] border-solid border-borderGray bg-white py-2 px-2'>
            <h3>{headerText}</h3>
            <button onClick={() => setFilterListOpen(false)}>
              <XIcon />
            </button>
          </div>

          {filterDropdownText.map((text, index) => {
            return (
              <FilterDropDown
                text={text}
                index={index}
                display={
                  mobileFilterCurrentCheck === index ? 'visible' : 'invisible'
                }
                setFilterListOpen={setFilterListOpen}
                currentCheck={mobileFilterCurrentCheck}
                setCurrentCheckFn={setMobileFilterCurrentCheck}
                key={index}
              />
            )
          })}
        </div>

        <div className='relative w-full'>
          <input
            type='text'
            className='h-[35px] w-full rounded rounded-tl-none rounded-bl-none border border-l-0 border-borderGray bg-commonBgGray pl-4 text-textGray'
            placeholder='Search all issues'
            value={inputText}
            onChange={(e) => setFilterInputText(e.target.value)}
          />
          <div className='absolute left-[8px] top-[9px]'>
            <SearchIcon fill={'rgb(87,96,106)'} />
          </div>
        </div>
      </div>
      <div
        className={`${
          filterListOpen ? 'block' : 'hidden'
        } fixed top-0 bottom-0 left-0 right-0 z-99 bg-maskBlack px-2 sm:bg-[transparent]`}
        onClick={() => setFilterListOpen(false)}></div>
    </div>
  )
}

export default Filters
