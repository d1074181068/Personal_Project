//Libraries
import React, { useState } from 'react'
import {
  XIcon,
  IssueOpenedIcon,
  CheckIcon,
  TriangleDownIcon
} from '@primer/octicons-react'
//components
import Filters from './Filters'
import SubNavButton from '../Label/SubNavButtonWrapper'
import GithubBtn from '../../components/Content/GithubBtn'
import StatusButton from './StatusButton'
import Dropdown from '../../components/Content/Dropdown'
import PopMenu from './DesktopPopMenu'
import MobilePopMenu from './MobilePopMenu'
import IssueItem from './IssueItem'

const headerTextArr = ['Label', 'Assignee', 'Sort']
const sortTextArr = [
  'Newest',
  'Oldest',
  'Most commented',
  'Least commented',
  'Recently updated',
  'Least recently updated'
]
function IssueList() {
  const [menuOpenStatus, setMenuOpenStatus] = useState(false)
  const [popMenuPos, setPopMenuPos] = useState({
    top: 'top-[100px]',
    left: 'left-[16px]'
  })
  return (
    <div className='mx-auto my-3 sm:max-w-[1216px] sm:px-2 md:px-3 lg:px-4 '>
      <div className='px-2 sm:px-0 md:mb-3'>
        <div className='flex flex-wrap items-center justify-between'>
          <div className='order-3 w-full md:order-1 md:block md:w-[unset] md:grow'>
            <Filters headerText={'Filter Issues'} />
          </div>
          <div className='md:order-1 md:ml-2'>
            <SubNavButton labelQuantity={4} unsetBg={true} />
          </div>
          <div className='md:order-3 md:ml-2'>
            <GithubBtn
              bgcolor={'#2DA44E'}
              $text={'New Issue'}
              textColor={'white'}
              hoverColor={'#2c974b'}
            />
          </div>
        </div>
        <a
          href='/'
          className='group hidden items-center'
          onClick={(e) => e.preventDefault()}
        >
          <div className='h-[18px] w-[18px] rounded bg-[#6e7781] group-hover:bg-hoverBlue'>
            <XIcon size={18} fill={'#FFF'} />
          </div>
          <span className='ml-1 group-hover:text-hoverBlue'>
            Clear current search query, filters, and sorts
          </span>
        </a>
      </div>
      <div className='flex items-center px-2 lg:hidden'>
        <StatusButton icon={<IssueOpenedIcon />} text={'open'} length={8} />
        <StatusButton icon={<CheckIcon />} text={'closed'} length={4} />
      </div>
      <div className='mt-2 flex items-center justify-between border-t border-b border-solid border-borderGray bg-commonBgGray px-4 py-2 sm:justify-start sm:rounded-tr sm:rounded-tl sm:border-x lg:justify-between'>
        <div className='hidden lg:block'>
          <div className='flex items-center px-2'>
            <StatusButton icon={<IssueOpenedIcon />} text={'open'} length={8} />
            <StatusButton icon={<CheckIcon />} text={'closed'} length={4} />
          </div>
        </div>
        <ul className='relative flex w-full justify-between sm:w-[unset]'>
          {headerTextArr.map((text, index) => {
            return (
              <li className='sm:mr-3' key={index}>
                <button className='flex'>
                  {index === headerTextArr.length - 1 ? (
                    <>
                      <div
                        className='hidden sm:block'
                        onClick={() => setMenuOpenStatus(false)}
                      >
                        <Dropdown
                          text='Sort by'
                          dropdownText={sortTextArr}
                          top={'25px'}
                          left={'-180px'}
                        />
                      </div>
                      <div className='block text-textGray sm:hidden'>
                        {text}
                      </div>
                    </>
                  ) : (
                    <div
                      className='relative flex items-center text-textGray'
                      onClick={(e) => {
                        if (
                          (e.target as HTMLDivElement).textContent === 'Label'
                        ) {
                          console.log((e.target as HTMLDivElement).textContent)
                          setPopMenuPos({
                            ...popMenuPos,
                            top: 'top-[25px]',
                            left: 'left-[0px]'
                          })
                        } else {
                          setPopMenuPos({
                            ...popMenuPos,
                            top: 'top-[25px]',
                            left: 'left-[50px]'
                          })
                        }
                        setMenuOpenStatus(true)
                      }}
                    >
                      <div>{text}</div>
                      <div className='hidden sm:block'>
                        <TriangleDownIcon />
                      </div>
                    </div>
                  )}
                </button>
              </li>
            )
          })}
          <PopMenu
            menuOpenStatus={menuOpenStatus}
            setMenuStatusFn={setMenuOpenStatus}
            top={popMenuPos.top}
            left={popMenuPos.left}
          />
        </ul>

        <MobilePopMenu
          menuOpenStatus={menuOpenStatus}
          setMenuStatusFn={setMenuOpenStatus}
        />
      </div>
      <ul>
        <IssueItem icon={<IssueOpenedIcon fill={'#1a7f37'} />} />
      </ul>
    </div>
  )
}

export default IssueList
