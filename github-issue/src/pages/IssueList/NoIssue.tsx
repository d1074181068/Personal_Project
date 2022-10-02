import React from 'react'
import { IssueOpenedIcon } from '@primer/octicons-react'

function NoIssue() {
  return (
    <li className='py-[80px] px-[40px] text-center'>
      <IssueOpenedIcon size={24} fill={'#57606a'} />
      <h3 className='my-2 text-[24px] font-medium'>
        No results matched your search.
      </h3>
      <p className='py-2 text-[16px]'>
        You could search
        <button className='ml-[5px]  text-hoverBlue hover:underline'>
          all of GitHub
        </button>{' '}
        or try an
        <button className='ml-[5px] text-hoverBlue hover:underline'>
          advanced search.
        </button>
      </p>
    </li>
  )
}

export default NoIssue
