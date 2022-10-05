//Libraries
import React, { useState } from 'react'
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

//components
import FeatureMenu from './FeatureMenu'
import GithubBtn from '../../components/Content/GithubBtn'

const iconArr = [
  [<HeadingIcon />, <BoldIcon />, <ItalicIcon />],
  [<QuoteIcon />, <CodeIcon />, <LinkIcon />],
  [<ListUnorderedIcon />, <ListOrderedIcon />, <TasklistIcon />],
  [<MentionIcon />, <ImageIcon />, <CrossReferenceIcon />, <ReplyIcon />]
]
function NewIssue() {
  const [navBarToggleStatus, setNavBarToggleStatus] = useState(true)
  const [markdownButtonListOpen, setMarkdownButtonListOpen] = useState(false)

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
                {iconArr[0].map((item, index) => {
                  return (
                    <li key={index} className={`px-[12px] py-1 md:px-1`}>
                      <button className='hover:text-hoverBlue'>{item}</button>
                    </li>
                  )
                })}
              </ul>
              <ul className='flex items-center'>
                {iconArr[1].map((item, index) => {
                  return (
                    <li
                      key={index}
                      className='px-[12px] py-1 first:pl-1 md:px-1'>
                      <button className='hover:text-hoverBlue'>{item}</button>
                    </li>
                  )
                })}
              </ul>
              <ul className={`hidden items-center md:flex`}>
                {iconArr[2].map((item, index) => {
                  return (
                    <li
                      key={index}
                      className='px-[12px] py-1 first:pl-1 md:px-1'>
                      <button className='hover:text-hoverBlue'>{item}</button>
                    </li>
                  )
                })}
              </ul>
              <ul className={`flex items-center`}>
                {iconArr[3].map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        index === 1 ? 'block  md:hidden' : null
                      } px-[12px] py-1 first:pl-1`}>
                      <button>{item}</button>
                    </li>
                  )
                })}
              </ul>
              <div
                className={`${
                  markdownButtonListOpen ? 'flex' : 'hidden'
                } w-full md:hidden`}>
                <ul className={`flex items-center`}>
                  {iconArr[0].map((item, index) => {
                    return (
                      <li key={index} className='px-[12px]  py-1 first:pl-1'>
                        {item}
                      </li>
                    )
                  })}
                </ul>
                <ul className={`flex items-center`}>
                  {iconArr[2].map((item, index) => {
                    return (
                      <li key={index} className='px-[12px] py-1 first:pl-1'>
                        {item}
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
          <textarea
            placeholder='Leave a comment'
            className=' mb-[-2px] min-h-[200px] w-full resize-y rounded border-b border-solid border-borderGray bg-commonBgGray p-1 pt-[10px] md:rounded-b-none md:border-dashed'
          />
          <label className='hidden bg-commonBgGray md:block'>
            <div className='flex items-center justify-between p-1 text-textGray'>
              <span>
                Attach files by dragging & dropping, selecting or pasting them.
              </span>
              <MarkdownIcon />
            </div>
            <input type='file' className='absolute w-full opacity-0 ' />
          </label>
        </div>
        <div
          className={`${
            !navBarToggleStatus
              ? 'block border-t border-solid border-borderGray pt-2 lg:mt-[-10px]'
              : 'hidden'
          } m-0 min-h-[200px] border-b-[2px] border-solid border-borderGray md:p-2`}>
          Nothing to preview
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
            />
          </div>
        </div>
      </div>
      <div className='md:ml-2 md:w-[240px]'>
        <div className='mt-5 md:mt-0'>
          <FeatureMenu type={'Assignees'} />
          <FeatureMenu type={'Labels'} />
        </div>
        <div className='py-5 md:hidden'>
          <GithubBtn
            bgcolor={'#2DA44E'}
            $text={'Submit new issue'}
            textColor={'white'}
            hoverColor={'#2c974b'}
            widthFull={'100%'}
          />
        </div>
      </div>
    </div>
  )
}

export default NewIssue
