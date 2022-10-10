//libraries
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//custom
import {
  useCreateIssueMutation,
  useGetAllAssigneesQuery
} from '../../redux/issueSlice'
import { useGetLabelQuery } from '../../redux/labelApiSlice'
import {
  handleAssignee,
  handleLabelTag,
  resetIssueContent
} from '../../redux/newIssueSlice'
import { RootState } from '../../redux/store'
import { Assignee, ClickFnType, LabelType } from '../../types/issueType'
import { MenuContentType } from '../IssueList/PopMenu'

//components
import GithubBtn from '../../components/Content/GithubBtn'
import FeatureMenu from './FeatureMenu'
import UserControlIssue from './UserControlIssue'
import { NotLogin } from '../Label/Label'

function NewIssue() {
  const { tokenReducer, newIssueReducer } = useSelector(
    (store: RootState) => store
  )
  const [popMenuData, setPopMenuData] = useState<MenuContentType>()
  const [createIssue] = useCreateIssueMutation()
  const dispatch = useDispatch()
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

  if (labelLoading || assigneeLoading) {
    return <>Loading...</>
  }
  if (assignError || labelError || !tokenReducer.token)
    return <NotLogin>你尚未登入</NotLogin>

  return (
    <div className='mx-auto mt-2 mb-[100px] flex max-w-[1280px] flex-col px-2 pt-2 md:flex-row md:items-start'>
      <img
        src='https://avatars.githubusercontent.com/u/71813522?v=4'
        alt='ownerImage'
        className='mr-2 hidden h-[40px] w-[40px] rounded-circle md:block'
      />
      <UserControlIssue titleInputPlaceholder={'Title'} />
      <div className='md:ml-2 md:w-[240px]'>
        <div className='mt-5 md:mt-0'>
          <FeatureMenu
            type={'Assignees'}
            organizeDataFn={organizeAssigneeData}
            menuContent={popMenuData}
            menuPos={'md:left-[-100px]'}
          />
          <FeatureMenu
            type={'Labels'}
            organizeDataFn={organizeLabelData}
            menuPos={'md:left-[-100px]'}
            menuContent={popMenuData}
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
                name: 'd1074181068',
                repo: 'webdesign',
                token: tokenReducer.token,
                body: {
                  title: newIssueReducer.content.title,
                  body: newIssueReducer.content.body,
                  labels: newIssueReducer.labelName.map(({ text }) => text),
                  assignees: newIssueReducer.assignees.map(({ text }) => text)
                }
              })
              dispatch(resetIssueContent())
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default NewIssue
