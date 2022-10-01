//Libraries
import React, { useState } from 'react'
import {
  XIcon,
  IssueOpenedIcon,
  CheckIcon,
  TriangleDownIcon
} from '@primer/octicons-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//components
import Filters from './Filters'
import SubNavButton from '../Label/SubNavButtonWrapper'
import GithubBtn from '../../components/Content/GithubBtn'
import StatusButton from './StatusButton'
import PopMenu from './PopMenu'
import IssueItem from './IssueItem'
import { NotLogin } from '../Label/Label'

//custom
import { useGetLabelQuery } from '../../redux/labelApiSlice'
import {
  useGetAllIssueQuery,
  useGetAllAssigneesQuery
} from '../../redux/issueSlice'

import { LabelType, Assignee } from '../../types/issueType'
import { MenuContentType } from './PopMenu'
import { RootState } from '../../redux/store'

export interface ContentType {
  icon?: string
  text?: string
  desc?: string
  userName?: string
  userImage?: string
}

const headerTextArr = ['Label', 'Assignee', 'Sort']

function IssueList() {
  const userToken = localStorage.getItem('userToken') as string
  const [menuOpenStatus, setMenuOpenStatus] = useState(false)
  const [popMenuData, setPopMenuData] = useState<MenuContentType>()
  const { queryReducer } = useSelector((store: RootState) => store)
  const dispatch = useDispatch()
  console.log(queryReducer)
  const query = () => {
    let queryStr = ''
    if (queryReducer.labelName.length !== 0) {
      queryStr += `labels=${queryReducer.labelName.join()}`
    }
    if (queryReducer.assigneeUser !== '') {
      queryStr += `&assignee=${queryReducer.assigneeUser}`
    }
    if (queryReducer.issueState !== '') {
      queryStr += `&state=${queryReducer.issueState}`
    }
    if (queryReducer.filters !== '') {
      if (queryReducer.filters === 'mention') {
        queryStr += `&mentioned=@me`
      } else if (queryReducer.filters === 'assign') {
        queryStr += `&assignee=d1074181068`
      } else {
        queryStr += `&creator=@me`
      }
    }
    if (queryReducer.sortIssue !== '') {
      queryStr += `&sort=${queryReducer.sortIssue}`
    }
    return queryStr
  }
  const navigate = useNavigate()
  const [popMenuPos, setPopMenuPos] = useState({
    top: 'top-[100px]',
    left: 'left-[16px]'
  })

  const {
    data: issueData,
    isLoading: issueLoading,
    isError: issueError
  } = useGetAllIssueQuery({
    name: 'd1074181068',
    repo: 'webdesign',
    token: userToken,
    query: query()
  })
  const {
    data: labelData,
    isLoading: labelLoading,
    isError: labelError
  } = useGetLabelQuery({
    name: 'd1074181068',
    repo: 'webdesign',
    token: userToken
  })

  const {
    data: assigneeData,
    isLoading: assigneeLoading,
    isError: assignError
  } = useGetAllAssigneesQuery({
    name: 'd1074181068',
    repo: 'webdesign',
    token: userToken
  })

  if (issueLoading || labelLoading || assigneeLoading) {
    return <>Loading...</>
  }
  if (assignError || issueError || labelError)
    return <NotLogin>你尚未登入</NotLogin>

  function organsizeLabelData() {
    const data = [...(labelData as LabelType[])]
    const contentData = data.map((item) => {
      return { icon: `#${item.color}`, text: item.name, desc: item.description }
    })
    const menuContent = {
      type: 'labels',
      title: 'Filter by label',
      inputPlaceholder: 'Filter labels',
      commonAction: 'Unlabeled',
      content: contentData
    }
    setPopMenuData(menuContent)
  }
  function organsizeAsigneeData() {
    const data = [...(assigneeData as Assignee[])]
    const contentData = data.map((item) => {
      return { userImage: item.avatar_url, userName: item.login }
    })
    const menuContent = {
      type: 'assignee',
      title: "Filter by who's assigned",
      inputPlaceholder: 'Filter users',
      commonAction: 'Assigned to nobody',
      content: contentData
    }
    setPopMenuData(menuContent)
  }
  function organsizeSortData() {
    const sortTextArr = [
      { text: 'Newest', query: 'created-desc' },
      { text: 'Oldest', query: 'created-asc' },
      { text: 'Most commented', query: 'comments-desc' },
      { text: 'Least commented', query: 'comments-asc' },
      { text: 'Recently updated', query: 'updated-desc' },
      { text: 'Least recently updated', query: 'updated-asc' }
    ]
    const menuContent = {
      type: 'sort',
      title: 'Sort by',
      sortTextArr: sortTextArr
    }
    setPopMenuData(menuContent)
  }

  return (
    <div className='mx-auto my-3 sm:max-w-[1216px] sm:px-2 md:px-3 lg:px-4 '>
      <div className='px-2 sm:px-0 md:mb-3'>
        <div className='flex flex-wrap items-center justify-between'>
          <div className='order-3 w-full md:order-1 md:block md:w-[unset] md:grow'>
            <Filters headerText={'Filter Issues'} />
          </div>
          <div className='md:order-1 md:ml-2'>
            <SubNavButton
              labelQuantity={4}
              unsetBg={true}
              clickFn={() => navigate('/label')}
            />
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
          onClick={(e) => e.preventDefault()}>
          <div className='h-[18px] w-[18px] rounded bg-[#6e7781] group-hover:bg-hoverBlue'>
            <XIcon size={18} fill={'#FFF'} />
          </div>
          <span className='ml-1 group-hover:text-hoverBlue'>
            Clear current search query, filters, and sorts
          </span>
        </a>
      </div>
      <div className='flex items-center px-2 lg:hidden'>
        <StatusButton icon={<IssueOpenedIcon />} text={'open'} />
        <StatusButton icon={<CheckIcon />} text={'closed'} />
      </div>
      <div className='mt-2 flex items-center justify-between border-t border-b border-solid border-borderGray bg-commonBgGray px-4 py-2 sm:justify-start sm:rounded-tr sm:rounded-tl sm:border-x lg:justify-between lg:px-0'>
        <div className='hidden lg:block'>
          <div className='flex items-center px-2'>
            <StatusButton icon={<IssueOpenedIcon />} text={'open'} />
            <StatusButton icon={<CheckIcon />} text={'closed'} />
          </div>
        </div>
        <ul className='relative flex w-full justify-between sm:w-[unset]'>
          {headerTextArr.map((text, index) => {
            return (
              <li className='sm:mr-3' key={index}>
                <button className='flex'>
                  <div
                    className='relative flex items-center text-textGray'
                    onClick={(e) => {
                      if (
                        (e.target as HTMLDivElement).textContent === 'Label'
                      ) {
                        setPopMenuPos({
                          ...popMenuPos,
                          top: 'sm:top-[25px]',
                          left: 'sm:left-[-40px]'
                        })
                        organsizeLabelData()
                      } else if (
                        (e.target as HTMLDivElement).textContent === 'Assignee'
                      ) {
                        setPopMenuPos({
                          ...popMenuPos,
                          top: 'sm:top-[25px]',
                          left: 'sm:left-[-40px]'
                        })
                        organsizeAsigneeData()
                      } else {
                        setPopMenuPos({
                          ...popMenuPos,
                          top: 'sm:top-[25px]',
                          left: 'sm:left-[-40px]'
                        })
                        organsizeSortData()
                      }
                      setMenuOpenStatus(true)
                    }}>
                    <div>{text}</div>
                    <div className='hidden sm:block'>
                      <TriangleDownIcon />
                    </div>
                  </div>
                </button>
              </li>
            )
          })}

          <PopMenu
            menuOpenStatus={menuOpenStatus}
            setMenuStatusFn={setMenuOpenStatus}
            menuContent={popMenuData}
            top={popMenuPos.top}
            left={popMenuPos.left}
          />
        </ul>
        <div
          className={`${
            menuOpenStatus ? 'block' : 'hidden'
          } fixed top-0 left-0 right-0 bottom-0 bg-maskBlack sm:bg-[transparent]`}
          onClick={() => setMenuOpenStatus(false)}></div>
      </div>
      <ul>
        {issueData &&
          issueData.map(
            ({
              title,
              labels,
              number,
              assignees,
              comments,
              user,
              created_at,
              state_reason
            }) => {
              return (
                <IssueItem
                  key={number}
                  title={title}
                  stateReason={state_reason}
                  labels={
                    labels &&
                    labels.map((data) => {
                      return {
                        name: data.name,
                        bgColor: data.color,
                        desc: data.description,
                        id: data.id
                      }
                    })
                  }
                  number={number}
                  assignees={
                    assignees &&
                    assignees.map((user) => {
                      return {
                        userImage: user.avatar_url,
                        userName: user.login
                      }
                    })
                  }
                  commentsQty={comments}
                  createBy={user.login}
                  createTime={created_at}
                />
              )
            }
          )}
      </ul>
    </div>
  )
}

export default IssueList
