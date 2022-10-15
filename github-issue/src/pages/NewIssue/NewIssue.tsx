//libraries
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//custom
import {
  useCreateIssueMutation,
  useGetAllAssigneesQuery
} from '../../redux/issueApiSlice'
import { useGetLabelQuery } from '../../redux/labelApiSlice'
import {
  handleAssignee,
  handleLabelTag,
  resetIssueContent
} from '../../redux/issueSlice'
import { RootState } from '../../redux/store'
import { Assignee, ClickFnType, LabelType } from '../../types/issueType'
import { MenuContentType } from '../IssueList/PopupMenu'

//components
import GithubBtn from '../../components/Content/GithubBtn'
import FeatureMenu from './FeatureMenu'
import UserControlIssue from './UserControlIssue'
import { NotLogin } from '../Label/Label'
import { useNavigate } from 'react-router-dom'

function NewIssue() {
  const repo = localStorage.getItem('repo')
  const userName = localStorage.getItem('userName')
  const { userReducer, issueReducer } = useSelector((store: RootState) => store)
  const [popMenuData, setPopMenuData] = useState<MenuContentType>()
  const [createIssue] = useCreateIssueMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(resetIssueContent())
  }, [])
  const {
    data: labelData,
    isLoading: labelLoading,
    isError: labelError
  } = useGetLabelQuery({
    name: userName ? userName : '',
    repo: repo ? repo : '',
    token: userReducer.token
  })
  const {
    data: assigneeData,
    isLoading: assigneeLoading,
    isError: assignError
  } = useGetAllAssigneesQuery({
    name: userName ? userName : '',
    repo: repo ? repo : '',
    token: userReducer.token
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

  if (labelLoading || assigneeLoading) {
    return <>Loading...</>
  }
  if (!userReducer.token) return <NotLogin>你尚未登入</NotLogin>
  if (assignError || labelError) {
    if (!repo) {
      alert('你尚未選擇repo,即將跳轉頁面')
      navigate('/')
      return <>error</>
    } else {
      return <>Error</>
    }
  }

  return (
    <div className='mx-auto mt-2 mb-[100px] flex max-w-[1280px] flex-col px-2 pt-2 md:flex-row md:items-start'>
      <img
        src='https://avatars.githubusercontent.com/u/71813522?v=4'
        alt='ownerImage'
        className='mr-2 hidden h-[40px] w-[40px] rounded-circle md:block'
      />
      <UserControlIssue
        titleInputPlaceholder={'Title'}
        mobileExist={false}
        actionBtn={{
          bgcolor: '#2DA44E',
          $text: 'Submit new issue',
          textColor: 'white',
          hoverColor: '#2c974b',
          widthFull: '100%',
          clickFn: () => {
            createIssue({
              name: userName ? userName : '',
              repo: repo ? repo : '',
              token: userReducer.token,
              body: {
                title: issueReducer.content.title,
                body: issueReducer.content.body,
                labels: issueReducer.labelName.map(({ text }) => text),
                assignees: issueReducer.assignees.map(({ text }) => text)
              }
            })
            dispatch(resetIssueContent())
            navigate('/issueList')
          }
        }}
      />
      <div className='md:ml-2 md:w-[240px]'>
        <div className='mt-5 md:mt-0'>
          <FeatureMenu
            type={'Assignees'}
            title={'Assignees'}
            organizeDataFn={organizeAssigneeData}
            menuContent={popMenuData}
            menuPos={'md:left-[-100px]'}
            updateOrigin={false}
          />
          <FeatureMenu
            type={'Labels'}
            title={'Labels'}
            organizeDataFn={organizeLabelData}
            menuPos={'md:left-[-100px]'}
            menuContent={popMenuData}
            updateOrigin={false}
          />
        </div>
        <div className='py-5 md:hidden'>
          <GithubBtn
            bgcolor={'#2DA44E'}
            $text={'Submit new issue'}
            textColor={'white'}
            hoverColor={'#2c974b'}
            widthFull={'100%'}
            clickFn={() => {
              createIssue({
                name: userName ? userName : '',
                repo: repo ? repo : '',
                token: userReducer.token,
                body: {
                  title: issueReducer.content.title,
                  body: issueReducer.content.body,
                  labels: issueReducer.labelName.map(({ text }) => text),
                  assignees: issueReducer.assignees.map(({ text }) => text)
                }
              })
              dispatch(resetIssueContent())
              navigate('/')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default NewIssue
