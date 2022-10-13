//libraries
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  IssueClosedIcon,
  IssueOpenedIcon,
  SkipIcon
} from '@primer/octicons-react'
//components
import GithubBtn from '../../components/Content/GithubBtn'
import LabelItem from '../Label/LabelItem'
import Comment from './Comment'
import FeatureMenu from '../NewIssue/FeatureMenu'
import UserControlIssue from '../NewIssue/UserControlIssue'
import { NotLogin } from '../Label/Label'

//custom
import { lightOrDark } from '../Label/HandleLabel'
import { Assignee, ClickFnType, LabelType } from '../../types/issueType'
import {
  handleAssignee,
  handleLabelTag,
  resetIssueContent
} from '../../redux/issueSlice'
import { useGetLabelQuery } from '../../redux/labelApiSlice'
import {
  useGetAllAssigneesQuery,
  useGetIssueQuery,
  useGetTimelineQuery,
  useUpdateIssueMutation
} from '../../redux/issueApiSlice'
import { MenuContentType } from '../IssueList/PopupMenu'
import { RootState } from '../../redux/store'
import { calculateTime } from '../IssueList/IssueItem'

function Issue() {
  const navigate = useNavigate()
  const { tokenReducer, issueReducer } = useSelector(
    (store: RootState) => store
  )
  const [popMenuData, setPopMenuData] = useState<MenuContentType>()
  const [fixedHeaderStatus, setFixedHeaderStatus] = useState(false)
  const [editTitle, setEditTitle] = useState(false)
  const [editTitleText, setEditTitleText] = useState('')
  const initTitleText = useRef('')
  const dispatch = useDispatch()
  const { issueId } = useParams()
  const [updateIssue] = useUpdateIssueMutation()
  const observer = useRef<IntersectionObserver | null>(null)
  const userPhoto = JSON.parse(
    localStorage.getItem('supabase.auth.token') as string
  ).currentSession.user.identities[0].identity_data.avatar_url
  const {
    data: issueData,
    isSuccess: issueSuccess,
    isLoading: issueLoading,
    isError: issueError
  } = useGetIssueQuery({
    name: 'd1074181068',
    repo: 'webdesign',
    token: tokenReducer.token,
    issueId: issueId ? issueId : ''
  })
  const {
    data: timelineData,
    isSuccess: timelineSuccess,
    isLoading: timelineLoading,
    isError: timelineError
  } = useGetTimelineQuery({
    name: 'd1074181068',
    repo: 'webdesign',
    token: tokenReducer.token,
    issueId: issueId ? issueId : ''
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

  function organizeLabelData() {
    const data = [...(labelData as LabelType[])]
    const contentData = data.map((item) => {
      return { icon: `#${item.color}`, text: item.name, desc: item.description }
    })
    const menuContent = {
      title: 'Assign up to 10 people to this',
      inputPlaceholder: 'Filter labels',
      clickFn: ({ text, colorCode }: ClickFnType) => {
        dispatch(
          handleLabelTag({ text, colorCode } as {
            text: string
            colorCode: string
          })
        )
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
      title: 'Assign up to 10 people to this issue',
      inputPlaceholder: 'Type or choose a user',
      clickFn: ({ text, imageUrl }: ClickFnType) => {
        dispatch(
          handleAssignee({ text, imageUrl } as {
            text: string
            imageUrl: string
          })
        )
      },
      content: contentData
    }
    setPopMenuData(menuContent)
  }
  const featureMenuContent = [
    {
      type: 'Assignees',
      title: 'Assignees',
      organizeDataFn: organizeAssigneeData,
      menuContent: popMenuData,
      menuPos: 'md:left-[-100px]'
    },
    {
      type: 'Labels',
      title: 'Labels',
      organizeDataFn: organizeLabelData,
      menuContent: popMenuData,
      menuPos: 'md:left-[-100px]'
    },
    {
      type: 'other',
      title: 'Projects',
      organizeDataFn: () => {}
    },
    {
      type: 'other',
      title: 'Milestone',
      organizeDataFn: () => {}
    },
    {
      type: 'other',
      title: 'Development',
      organizeDataFn: () => {}
    }
  ]
  useEffect(() => {
    dispatch(resetIssueContent())
    issueData?.assignees.map(({ login, avatar_url }) => {
      dispatch(handleAssignee({ text: login, imageUrl: avatar_url }))
    })
    issueData?.labels.map(({ name, color }) => {
      dispatch(handleLabelTag({ text: name, colorCode: '#' + color }))
    })
  }, [issueData])

  const headerBottom = useCallback((node: HTMLDivElement) => {
    if (node) {
      const options = {
        rootMargin: '0px',
        threshold: 0
      }
      const callback = (entries: { isIntersecting: any }[]) => {
        if (entries[0].isIntersecting) {
          setFixedHeaderStatus(false)
        } else {
          setFixedHeaderStatus(true)
        }
      }
      observer.current = new IntersectionObserver(callback, options)
      observer.current.observe(node)
    }
  }, [])

  const commentsData = timelineData?.filter(
    (item) => item.event === 'commented'
  )

  if (issueLoading || labelLoading || assigneeLoading) {
    return <>Loading...</>
  }
  if (assignError || issueError || labelError || !tokenReducer.token)
    return <NotLogin>你尚未登入</NotLogin>
  if (issueSuccess) {
    initTitleText.current = issueData.title
  }
  return (
    <>
      {issueData && (
        <div className='mx-auto mt-3 mb-5 max-w-[1280px] px-2'>
          <header
            className={`${
              !editTitle ? 'block' : 'hidden'
            } flex flex-wrap items-start justify-between md:items-center`}>
            <div className='flex items-center md:order-1'>
              <div className='mr-1 text-[12px]'>
                <GithubBtn
                  bgcolor={'#f6f8fa'}
                  $text={'Edit'}
                  border={'1px solid rgba(27,31,36,0.15)'}
                  textColor={'#000000'}
                  hoverColor={'#f3f4f6'}
                  clickFn={() => {
                    setEditTitleText(initTitleText.current)
                    setEditTitle(true)
                  }}
                />
              </div>
              <div className='text-[12px]'>
                <GithubBtn
                  bgcolor={'#2DA44E'}
                  $text={'New issue'}
                  textColor={'white'}
                  hoverColor={'#2c974b'}
                  clickFn={() => {
                    navigate('/newissue')
                    dispatch(resetIssueContent())
                  }}
                />
              </div>
            </div>
            <button className='text-hoverBlue hover:underline md:hidden'>
              Jump to bottom
            </button>
            <h1 className='md:order-0 mt-2 w-full text-[26px] leading-[1.3] md:mt-0 md:w-[unset]'>
              {issueData.title}{' '}
              <span className='text-textGray'>#{issueId}</span>
            </h1>
          </header>
          <header
            className={`${
              editTitle ? 'block md:flex' : 'hidden'
            } items-center`}>
            <input
              type='text'
              value={editTitleText}
              onChange={(e) => setEditTitleText(e.target.value)}
              className='mb-2 h-[32px] w-full rounded border border-solid border-borderGray bg-commonBgGray pl-1 md:mr-2 md:mb-0'
            />
            <div className='flex'>
              <div className='mr-1 text-[12px]'>
                <GithubBtn
                  bgcolor={'#f6f8fa'}
                  $text={'Save'}
                  border={'1px solid rgba(27,31,36,0.15)'}
                  textColor={'#000000'}
                  hoverColor={'#f3f4f6'}
                  clickFn={() => {
                    updateIssue({
                      name: 'd1074181068',
                      repo: 'webdesign',
                      token: tokenReducer.token,
                      issueNumber: issueId as string,
                      body: {
                        title: editTitleText
                      }
                    })
                    setEditTitle(false)
                  }}
                />
              </div>
              <button
                className='text-[12px] text-hoverBlue hover:underline'
                onClick={() => {
                  setEditTitleText(initTitleText.current)
                  setEditTitle(false)
                }}>
                Cancel
              </button>
            </div>
          </header>
          <header
            className={`${
              fixedHeaderStatus ? 'block' : 'hidden'
            } fixed top-0 left-0 right-0 z-[200] flex border-b border-solid border-borderGray bg-white px-2 py-1`}>
            <div className='mr-1 flex whitespace-nowrap'>
              <LabelItem
                labelName={issueData.state === 'open' ? 'Open' : 'Closed'}
                colorCode={
                  issueData.state === 'open'
                    ? '#2DA44E'
                    : issueData.state_reason === 'completed'
                    ? '#8250df'
                    : '#57606a'
                }
                textColor={'white'}
                icon={
                  issueData.state === 'open' ? (
                    <IssueOpenedIcon />
                  ) : issueData.state_reason === 'completed' ? (
                    <IssueClosedIcon />
                  ) : (
                    <SkipIcon />
                  )
                }
                padding={'8px 12px'}
              />
            </div>
            <div className='flex flex-col justify-between truncate'>
              <h1 className='text-[14px] font-medium leading-[1.3]'>
                {issueData.title}{' '}
                <span className='text-textGray'>#{issueId}</span>
              </h1>
              <p className='text-[12px]'>
                <button className='mr-[4px] font-medium text-textGray'>
                  {issueData.user.login}
                </button>
                <span className='text-textGray'>
                  opened this issue {calculateTime(issueData.created_at)} ago ·{' '}
                  {issueData.comments} comments
                </span>
              </p>
            </div>
          </header>
          <div
            className='mt-1 flex flex-wrap items-center md:mb-4 md:border-b md:border-solid md:border-borderGray'
            ref={headerBottom}>
            <div className='mb-1 mr-1 flex'>
              <LabelItem
                labelName={issueData.state === 'open' ? 'Open' : 'Closed'}
                colorCode={
                  issueData.state === 'open'
                    ? '#2DA44E'
                    : issueData.state_reason === 'completed'
                    ? '#8250df'
                    : '#57606a'
                }
                textColor={'white'}
                icon={
                  issueData.state === 'open' ? (
                    <IssueOpenedIcon />
                  ) : issueData.state_reason === 'completed' ? (
                    <IssueClosedIcon />
                  ) : (
                    <SkipIcon />
                  )
                }
                padding={'8px 12px'}
              />
            </div>
            <p className='mb-1 text-[14px]'>
              <button className='mr-[4px] font-medium text-textGray'>
                {issueData.user.login}
              </button>
              <span className='text-textGray'>
                opened this issue {calculateTime(issueData.created_at)} ago ·{' '}
                {issueData.comments} comments
              </span>
            </p>
          </div>
          <div className='mb-2 border-y border-solid border-borderGray py-2 md:hidden'>
            <div className='mt-2 mb-1 flex items-center'>
              <h3 className='w-[24.9999%] sm:w-[16.66666%]'>Assignees</h3>
              <ul className='flex'>
                {issueReducer.assignees.map(({ imageUrl }, index) => {
                  return (
                    <li key={index}>
                      <img
                        src={imageUrl}
                        alt='userImage'
                        className='h-[20px] w-[20px] rounded-circle'
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className='mt-2 mb-1 flex items-start'>
              <h3 className='w-[24.9999%] sm:w-[16.66666%]'>Labels</h3>
              <ul className='flex flex-wrap gap-[2px]'>
                {issueReducer.labelName.map(({ text, colorCode }, index) => {
                  return (
                    <li key={index} className='flex'>
                      <LabelItem
                        labelName={text}
                        colorCode={colorCode}
                        textColor={lightOrDark(colorCode)}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <main className='flex flex-col md:flex-row'>
            <div className='flex grow'>
              <div className='grow'>
                <div className='relative'>
                  <div className='flex'>
                    <img
                      src={issueData.user.avatar_url}
                      alt='userImage'
                      className='mr-2 hidden h-[40px] w-[40px] rounded-circle md:block'
                    />
                    <div className='grow'>
                      <Comment
                        id={issueData.id}
                        body={issueData.body}
                        user={issueData.user.login}
                        createTime={issueData.created_at}
                        authorAssociation={issueData.author_association}
                        type={'issueComment'}
                      />
                    </div>
                  </div>
                  {commentsData?.map(
                    (
                      { id, actor, body, created_at, author_association },
                      index
                    ) => {
                      return (
                        <div className='flex' key={index}>
                          <img
                            src={actor.avatar_url}
                            alt='userImage'
                            className='mr-2 hidden h-[40px] w-[40px] rounded-circle md:block'
                          />
                          <div className='grow'>
                            <Comment
                              id={id}
                              body={body}
                              user={actor.login}
                              createTime={created_at}
                              authorAssociation={author_association}
                              type={'issueComment'}
                            />
                          </div>
                        </div>
                      )
                    }
                  )}

                  <div className='absolute top-0 left-[15px] right-0 bottom-0 z-[-10] border-l-[2px] border-solid border-borderGray md:left-[70px]'></div>
                </div>

                <div className='border-t-[2px] border-solid border-borderGray pt-4'>
                  <UserControlIssue
                    titleInputPlaceholder=''
                    initStatusBtn='reopen'
                    actionBtn={{
                      bgcolor: '#2DA44E',
                      $text: 'Comment',
                      textColor: 'white',
                      hoverColor: '#2c974b',
                      clickFn: () => {}
                    }}
                    mobileExist={true}
                  />
                </div>
              </div>
            </div>

            <div className='mt-3 md:mt-0 md:ml-2 md:w-[240px]'>
              {featureMenuContent.map(
                (
                  { type, title, organizeDataFn, menuContent, menuPos },
                  index
                ) => {
                  return (
                    <FeatureMenu
                      type={type}
                      title={title}
                      organizeDataFn={organizeDataFn}
                      menuContent={menuContent}
                      menuPos={menuPos}
                      key={index}
                    />
                  )
                }
              )}
            </div>
          </main>
        </div>
      )}
    </>
  )
}

export default Issue
