//Libraries
import React, { useRef, useState } from 'react'
import {
  MarkdownIcon,
  InfoIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  QuoteIcon,
  CodeIcon,
  LinkIcon,
  MentionIcon,
  ImageIcon,
  CrossReferenceIcon,
  ReplyIcon,
  HeadingIcon,
  BoldIcon,
  ItalicIcon,
  ListUnorderedIcon,
  ListOrderedIcon,
  TasklistIcon
} from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import { marked } from 'marked'
import TextareaMarkdown, { TextareaMarkdownRef } from 'textarea-markdown-editor'

//components
import FeatureMenu from './FeatureMenu'
import GithubBtn from '../../components/Content/GithubBtn'
import { NotLogin } from '../Label/Label'
//custom
import { useGetLabelQuery } from '../../redux/labelApiSlice'
import { RootState } from '../../redux/store'
import { Assignee, ClickFnType, LabelType } from '../../types/issueType'
import { MenuContentType } from '../IssueList/PopMenu'
import {
  useGetAllAssigneesQuery,
  useCreateIssueMutation
} from '../../redux/issueSlice'
import {
  handleLabelTag,
  handleAssignee,
  handleTitle,
  handleIssueBody,
  resetIssueContent
} from '../../redux/newIssueSlice'
import '../../utils/markdownStyle.css'

const iconArr = [
  [
    { icon: <HeadingIcon />, trigger: 'h1' },
    { icon: <BoldIcon />, trigger: 'bold' },
    { icon: <ItalicIcon />, trigger: 'italic' }
  ],
  [
    { icon: <QuoteIcon />, trigger: 'block-quotes' },
    { icon: <CodeIcon />, trigger: 'code' },
    { icon: <LinkIcon />, trigger: 'link' }
  ],
  [
    { icon: <ListUnorderedIcon />, trigger: 'unordered-list' },
    { icon: <ListOrderedIcon />, trigger: 'ordered-list' },
    { icon: <TasklistIcon />, trigger: 'ordered-list' }
  ],
  [
    { icon: <MentionIcon />, trigger: 'bold' },
    { icon: <ImageIcon />, trigger: 'image' },
    { icon: <CrossReferenceIcon />, trigger: 'bold' },
    { icon: <ReplyIcon />, trigger: 'bold' }
  ]
]

function NewIssue() {
  const [navBarToggleStatus, setNavBarToggleStatus] = useState(true)
  const [markdownButtonListOpen, setMarkdownButtonListOpen] = useState(false)
  const { tokenReducer, newIssueReducer } = useSelector(
    (store: RootState) => store
  )
  const [popMenuData, setPopMenuData] = useState<MenuContentType>()
  const [createIssue] = useCreateIssueMutation()
  const dispatch = useDispatch()
  const ref = useRef<TextareaMarkdownRef>(null)

  const renderer = {
    listitem(text: string, booleantask: boolean, checked: boolean) {
      if (checked !== undefined) {
        return `<li class='check'>${text}</li>`
      }
      return `<li>${text}</li>`
    },
    paragraph(text: string) {
      const mentionText = text.match(/^\@/g)
      const hashText = text.match(/^\#/g)
      if (!hashText && !mentionText) {
        return `<p>${text}</p>`
      }
      return `<button ${
        mentionText ? 'class=mention' : 'class="hash"'
      }>${text}</button>`
    }
  }
  marked.use({ renderer })
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
      <div className='grow md:rounded md:border md:border-solid md:border-borderGray md:p-1'>
        <input
          type='text'
          className='mb-2 h-[32px] w-full rounded border border-solid border-borderGray bg-commonBgGray pl-1'
          placeholder='Title'
          value={newIssueReducer.content.title}
          onChange={(e) => dispatch(handleTitle(e.target.value))}
        />
        <div className='lg:mb-1 lg:flex lg:h-[41px]'>
          <div className='mb-[-1px] flex md:border-borderGray'>
            <button
              onClick={() => setNavBarToggleStatus((prev) => !prev)}
              className={`mb-[-5px] h-[41px] grow border border-r-0 border-solid border-borderGray md:w-[68px] md:grow-[unset]  md:bg-white ${
                navBarToggleStatus
                  ? 'rounded-t border-b-white bg-white md:border-r'
                  : ' bg-commonBgGray md:border-0 md:border-b'
              }  `}>
              Write
            </button>
            <button
              onClick={() => setNavBarToggleStatus((prev) => !prev)}
              className={`h-[41px] grow border border-solid border-borderGray md:w-[68px] md:grow-[unset] md:bg-white ${
                !navBarToggleStatus
                  ? ' rounded-t border-b-white '
                  : ' bg-commonBgGray md:border-0 md:border-b'
              } border-borderGray`}>
              Preview
            </button>
          </div>
          <div
            className={`${
              navBarToggleStatus ? 'block' : 'hidden'
            } border-solid border-borderGray lg:grow lg:border-b`}>
            <div className='flex flex-wrap p-1 md:flex-nowrap md:border-t md:border-solid md:border-borderGray md:px-0 lg:justify-end lg:border-t-0 lg:p-0'>
              <button
                className='flex grow items-center p-1 md:hidden'
                onClick={() => setMarkdownButtonListOpen((prev) => !prev)}>
                <span className='mr-[5px]'>Aa</span>
                {markdownButtonListOpen ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronUpIcon />
                )}
              </button>
              <ul className={`hidden items-center md:flex`}>
                {iconArr[0].map(({ icon, trigger }, index) => {
                  return (
                    <li key={index} className={`px-[12px] py-1 md:px-1`}>
                      <button
                        className='hover:text-hoverBlue'
                        onClick={() => ref.current?.trigger(trigger)}>
                        {icon}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <ul className='flex items-center'>
                {iconArr[1].map(({ icon, trigger }, index) => {
                  return (
                    <li
                      key={index}
                      className='px-[12px] py-1 first:pl-1 md:px-1'>
                      <button
                        className='hover:text-hoverBlue'
                        onClick={() => ref.current?.trigger(trigger)}>
                        {icon}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <ul className={`hidden items-center md:flex`}>
                {iconArr[2].map(({ icon, trigger }, index) => {
                  return (
                    <li
                      key={index}
                      className='px-[12px] py-1 first:pl-1 md:px-1'>
                      <button
                        className='hover:text-hoverBlue'
                        onClick={() => ref.current?.trigger(trigger)}>
                        {icon}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <ul className={`flex items-center`}>
                {iconArr[3].map(({ icon, trigger }, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        index === 1 ? 'block  md:hidden' : null
                      } px-[12px] py-1 first:pl-1`}>
                      <button onClick={() => ref.current?.trigger(trigger)}>
                        {icon}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div
                className={`${
                  markdownButtonListOpen ? 'flex' : 'hidden'
                } w-full md:hidden`}>
                <ul className={`flex items-center`}>
                  {iconArr[0].map(({ icon, trigger }, index) => {
                    return (
                      <li key={index} className='px-[12px]  py-1 first:pl-1'>
                        <button onClick={() => ref.current?.trigger(trigger)}>
                          {icon}
                        </button>
                      </li>
                    )
                  })}
                </ul>
                <ul className={`flex items-center`}>
                  {iconArr[2].map(({ icon, trigger }, index) => {
                    return (
                      <li key={index} className='px-[12px] py-1 first:pl-1'>
                        <button onClick={() => ref.current?.trigger(trigger)}>
                          {icon}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            navBarToggleStatus ? 'block' : 'hidden'
          } rounded border border-solid border-borderGray`}>
          <TextareaMarkdown.Wrapper ref={ref}>
            <textarea
              placeholder='Leave a comment'
              className=' mb-[-2px] min-h-[200px] w-full resize-y rounded border-b border-solid border-borderGray bg-commonBgGray p-1 pt-[10px] leading-[1.5] md:rounded-b-none md:border-dashed'
              value={newIssueReducer.content.body}
              onChange={(e) => dispatch(handleIssueBody(e.target.value))}
            />
          </TextareaMarkdown.Wrapper>

          <label className='hidden bg-commonBgGray md:block'>
            <div className='flex items-center justify-between p-1 text-textGray'>
              <span>
                Attach files by dragging & dropping, selecting or pasting them.
              </span>
              <MarkdownIcon />
            </div>
            <input type='file' className='absolute  opacity-0 ' />
          </label>
        </div>
        <div
          className={`${
            !navBarToggleStatus
              ? 'block border-t border-solid border-borderGray py-2 lg:mt-[-10px]'
              : 'hidden'
          } m-0 min-h-[200px] border-b-[2px] border-solid border-borderGray md:p-2`}>
          <div
            className='prose'
            dangerouslySetInnerHTML={{
              __html: marked(newIssueReducer.content.body, {
                gfm: true,
                breaks: true
              })
            }}></div>
        </div>

        <p className='mt-2 mb-1 block text-[12px] md:hidden'>
          <InfoIcon />
          <span className='ml-[5px] leading-[1.7] text-textGray'>
            Remember, contributions to this repository should follow our{' '}
            <span className='text-hoverBlue hover:underline'>
              GitHub Community Guidelines.
            </span>
          </span>
        </p>

        <div className='mt-2 hidden items-center justify-between md:flex'>
          <a
            href='https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'
            className='flex items-center text-[#57606a] hover:text-hoverBlue'>
            <div className='mr-1'>
              <MarkdownIcon />
            </div>
            Styling with Markdown is supported
          </a>
          <div>
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
      <div className='md:ml-2 md:w-[240px]'>
        <div className='mt-5 md:mt-0'>
          <FeatureMenu
            type={'Assignees'}
            organizeDataFn={organizeAssigneeData}
            menuContent={popMenuData}
          />
          <FeatureMenu
            type={'Labels'}
            organizeDataFn={organizeLabelData}
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
