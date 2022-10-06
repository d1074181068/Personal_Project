//Libraries
import React, { useEffect, useState } from 'react'
import {
  XIcon,
  IssueOpenedIcon,
  CheckIcon,
  TriangleDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon
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
import NoIssue from './NoIssue'

//custom
import { useGetLabelQuery } from '../../redux/labelApiSlice'
import {
  useGetAllIssueQuery,
  useGetAllAssigneesQuery
} from '../../redux/issueSlice'
import {
  handlePage,
  resetAllFilter,
  addLabelFilterText,
  deleteLabelFilterText,
  updateAssigneeUser,
  resetLabelFilterText
} from '../../redux/querySlice'
import { LabelType, Assignee } from '../../types/issueType'
import { MenuContentType } from './PopMenu'
import { RootState } from '../../redux/store'
import { ClickFnType } from '../../types/issueType'

export interface ContentType {
  icon?: string
  text?: string
  desc?: string
  userName?: string
  userImage?: string
}

const headerTextArr = ['Label', 'Assignee', 'Sort']

function IssueList() {
  const [menuOpenStatus, setMenuOpenStatus] = useState(false)
  const [popMenuData, setPopMenuData] = useState<MenuContentType>()
  const [filterInputText, setFilterInputText] = useState('')
  const navigate = useNavigate()
  const [popMenuPos, setPopMenuPos] = useState({
    top: 'top-[100px]',
    left: 'left-[16px]'
  })
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const { queryReducer, tokenReducer } = useSelector(
    (store: RootState) => store
  )
  let inputText = 'is:issue '
  for (const key in queryReducer) {
    if (key === 'issueState') {
      inputText += `is:${queryReducer[key]} `
    }
    if (key === 'labelName') {
      queryReducer[key].forEach((text) => {
        inputText += `label:${text} `
      })
    }
    if (key === 'assigneeUser') {
      if (queryReducer[key] !== '') {
        inputText += `assignee:${queryReducer[key]} `
      }
    }
    if (key === 'filters') {
      if (queryReducer[key] === 'assign') inputText += `assignee:@me `
      if (queryReducer[key] === 'allIssue') inputText += `author:@me `
      if (queryReducer[key] === 'mention') inputText += `mentions:@me `
    }
    if (key === 'sortIssue') {
      if (queryReducer[key] !== '') {
        inputText += `sort:${queryReducer[key]} `
      }
    }
  }
  useEffect(() => {
    setFilterInputText(inputText)
  }, [inputText])

  const query = () => {
    let queryStr = ''
    if (queryReducer.labelName.length !== 0) {
      queryStr += `&labels=${queryReducer.labelName.join()}`
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
    queryStr += `&per_page=5&page=${page}`
    return queryStr
  }
  const clearStatus =
    queryReducer.labelName.length !== 0
      ? true
      : queryReducer.assigneeUser !== ''
      ? true
      : queryReducer.filters !== ''
      ? true
      : queryReducer.sortIssue !== ''
      ? true
      : queryReducer.issueState !== 'open'
      ? true
      : false
  const {
    data: issueData,
    isLoading: issueLoading,
    isError: issueError
  } = useGetAllIssueQuery({
    name: 'd1074181068',
    repo: 'webdesign',
    token: tokenReducer.token,
    perPage: 5,
    page: queryReducer.page,
    query: query()
  })
  const {
    data: labelData,
    isLoading: labelLoading,
    isError: labelError
  } = useGetLabelQuery({
    name: 'd1074181068',
    repo: 'webdesign',
    token: tokenReducer.token
  })

  const {
    data: assigneeData,
    isLoading: assigneeLoading,
    isError: assignError
  } = useGetAllAssigneesQuery({
    name: 'd1074181068',
    repo: 'webdesign',
    token: tokenReducer.token
  })

  if (issueLoading || labelLoading || assigneeLoading) {
    return <>Loading...</>
  }
  if (assignError || issueError || labelError || !tokenReducer.token)
    return <NotLogin>你尚未登入</NotLogin>

  const renderData = issueData?.filter((item) => {
    return !('pull_request' in item)
  })

  function organizeLabelData() {
    const data = [...(labelData as LabelType[])]
    const contentData = data.map((item) => {
      return { icon: `#${item.color}`, text: item.name, desc: item.description }
    })
    const menuContent = {
      type: 'labels',
      title: 'Filter by label',
      inputPlaceholder: 'Filter labels',
      commonAction: 'Unlabeled',
      clickFn: ({ text }: ClickFnType) => {
        if (queryReducer.labelName.includes(text as string)) {
          dispatch(deleteLabelFilterText(text as string))
        } else {
          dispatch(addLabelFilterText(text as string))
        }
        setMenuOpenStatus(false)
      },
      content: contentData
    }
    setPopMenuData(menuContent)
  }
  function organizeAssigneeData() {
    const data = [...(assigneeData as Assignee[])]
    const contentData = data.map((item) => {
      return { userImage: item.avatar_url, userName: item.login }
    })
    const menuContent = {
      type: 'assignee',
      title: "Filter by who's assigned",
      inputPlaceholder: 'Filter users',
      commonAction: 'Assigned to nobody',
      clickFn: ({ text }: ClickFnType) => {
        dispatch(
          updateAssigneeUser(
            queryReducer.assigneeUser === text ? '' : (text as string)
          )
        )
        setMenuOpenStatus(false)
      },
      content: contentData
    }
    setPopMenuData(menuContent)
  }
  function organizeSortData() {
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
            <Filters
              headerText={'Filter Issues'}
              inputText={filterInputText}
              setFilterInputText={setFilterInputText}
            />
          </div>
          <div className='md:order-1 md:ml-2'>
            <SubNavButton
              labelQuantity={labelData?.length}
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
        <button
          className={`group mt-2 ${
            clearStatus ? 'flex' : 'hidden'
          }  items-center`}
          onClick={() => dispatch(resetAllFilter())}>
          <div className='h-[18px] w-[18px] rounded bg-[#6e7781] group-hover:bg-hoverBlue'>
            <XIcon size={18} fill={'#FFF'} />
          </div>
          <span className='ml-1 group-hover:text-hoverBlue'>
            Clear current search query, filters, and sorts
          </span>
        </button>
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
                        organizeLabelData()
                      } else if (
                        (e.target as HTMLDivElement).textContent === 'Assignee'
                      ) {
                        setPopMenuPos({
                          ...popMenuPos,
                          top: 'sm:top-[25px]',
                          left: 'sm:left-[-40px]'
                        })
                        organizeAssigneeData()
                      } else {
                        setPopMenuPos({
                          ...popMenuPos,
                          top: 'sm:top-[25px]',
                          left: 'sm:left-[-40px]'
                        })
                        organizeSortData()
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
          } fixed top-0 left-0 right-0 bottom-0 z-199 bg-maskBlack sm:bg-[transparent]`}
          onClick={() => setMenuOpenStatus(false)}></div>
      </div>
      <ul>
        {renderData ? (
          renderData.length === 0 ? (
            <NoIssue />
          ) : (
            renderData.map(
              ({
                title,
                labels,
                number,
                assignees,
                comments,
                user,
                created_at,
                state_reason,
                body
              }) => {
                return (
                  <IssueItem
                    key={number}
                    title={title}
                    body={body}
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
                    ownerImg={user.avatar_url}
                  />
                )
              }
            )
          )
        ) : (
          <></>
        )}
      </ul>
      <div className='flex items-center justify-center p-3'>
        <button
          className={`item-center mr-3  flex rounded border border-solid border-[transparent] py-1 px-[10px] transition-all ${
            page === 1
              ? 'cursor-no-drop hover:border-[transparent]'
              : 'hover:border-borderGray'
          } `}
          onClick={() => {
            dispatch(handlePage(page <= 1 ? 1 : page - 1))
            setPage((prev) => (prev <= 1 ? 1 : prev - 1))
          }}>
          <ChevronLeftIcon fill={page === 1 ? '#57606a' : '#0969da'} />
          <span
            className={`ml-1 leading-[16px] ${
              page === 1 ? 'text-textGray' : 'text-hoverBlue'
            } `}>
            Previous
          </span>
        </button>
        <button
          className={`item-center mr-3 flex rounded border border-solid border-[transparent] py-1 px-[10px] transition-all ${
            renderData
              ? renderData.length < 5
                ? 'cursor-no-drop hover:border-[transparent]'
                : 'hover:border-borderGray'
              : 'cursor-no-drop hover:border-[transparent]'
          }`}
          disabled={renderData ? (renderData.length < 5 ? true : false) : true}
          onClick={() => {
            dispatch(handlePage(page + 1))
            setPage((prev) => prev + 1)
          }}>
          <span
            className={`mr-1 leading-[16px] ${
              renderData
                ? renderData.length < 5
                  ? 'text-textGray'
                  : 'text-hoverBlue'
                : 'text-textGray'
            } `}>
            Next
          </span>
          <ChevronRightIcon
            fill={
              renderData
                ? renderData.length < 5
                  ? '#57606a'
                  : '#0969da'
                : '#57606a'
            }
          />
        </button>
      </div>
    </div>
  )
}

export default IssueList
