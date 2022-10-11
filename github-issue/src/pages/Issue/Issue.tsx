//libraries
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IssueOpenedIcon } from '@primer/octicons-react'
//components
import GithubBtn from '../../components/Content/GithubBtn'
import LabelItem from '../Label/LabelItem'
//custom
import { lightOrDark } from '../Label/HandleLabel'

const assigneeArr = [
  {
    text: 'd1074181068',
    imgUrl: 'https://avatars.githubusercontent.com/u/71813522?v=4'
  },
  {
    text: 'Frank',
    imgUrl: 'https://avatars.githubusercontent.com/u/71813522?v=4'
  }
]

const labelArr = [
  {
    text: 'Frank',
    colorCode: '#FF0000'
  },
  {
    text: 'Frank',
    colorCode: '#FF731D'
  },
  {
    text: 'Frank',
    colorCode: '#FFF7E9'
  },
  {
    text: 'Frank',
    colorCode: '#5F9DF7'
  },
  {
    text: 'Frank',
    colorCode: '#FF0000'
  },
  {
    text: 'Frank',
    colorCode: '#1746A2'
  },
  {
    text: 'Frank',
    colorCode: '#905E96'
  }
]

function Issue() {
  const navigate = useNavigate()
  const { issueId } = useParams()
  return (
    <div className='mx-auto mt-3 mb-5 max-w-[1280px] px-2'>
      <header className='flex flex-wrap items-start justify-between md:items-center'>
        <div className='flex items-center md:order-1'>
          <div className='mr-1 text-[12px]'>
            <GithubBtn
              bgcolor={'#f6f8fa'}
              $text={'Edit'}
              border={'1px solid rgba(27,31,36,0.15)'}
              textColor={'#000000'}
              hoverColor={'#f3f4f6'}
              clickFn={() => {
                navigate('/')
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
                navigate('/')
              }}
            />
          </div>
        </div>
        <button className='text-hoverBlue hover:underline md:hidden'>
          Jump to bottom
        </button>
        <h1 className='md:order-0 mt-2 w-full text-[26px] leading-[1.3] md:mt-0 md:w-[unset]'>
          testdemoasdsadsadsad <span className='text-textGray'>#{issueId}</span>
        </h1>
      </header>
      <div className='mt-1 flex flex-wrap items-center'>
        <div className='mb-1 mr-1 flex'>
          <LabelItem
            labelName={'Open'}
            colorCode={'#2DA44E'}
            textColor={'white'}
            icon={<IssueOpenedIcon />}
            padding={'8px 12px'}
          />
        </div>
        <p className='mb-1 text-[14px]'>
          <button className='mr-[4px] font-medium text-textGray'>
            d1074181068
          </button>
          <span className='text-textGray'>
            opened this issue 7 hours ago · 5 comments
          </span>
        </p>
      </div>
      <div className='border-y border-solid border-borderGray py-2 md:hidden'>
        <div className='mt-2 mb-1 flex items-center'>
          <h3 className='w-[24.9999%] sm:w-[16.66666%]'>Assignees</h3>
          <ul className='flex'>
            {assigneeArr.map(({ imgUrl }, index) => {
              return (
                <li key={index}>
                  <img
                    src={imgUrl}
                    alt='userImage'
                    className='h-[20px] w-[20px] rounded-circle'
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <div className='mt-2 mb-1 flex items-center'>
          <h3 className='w-[24.9999%] sm:w-[16.66666%]'>Labels</h3>
          <ul className='flex flex-wrap gap-[2px]'>
            {labelArr.map(({ text, colorCode }, index) => {
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
    </div>
  )
}

export default Issue
