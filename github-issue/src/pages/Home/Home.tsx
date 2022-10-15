//libraries
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//components
import { NotLogin } from '../Label/Label'
//custom
import { RootState } from '../../redux/store'
import { useGetAllRepoQuery } from '../../redux/repoApiSlice'

function Home() {
  const { userReducer } = useSelector((store: RootState) => store)
  const userName = localStorage.getItem('userName')
  const navigate = useNavigate()
  const userPhoto = JSON.parse(
    localStorage.getItem('supabase.auth.token') as string
  )?.currentSession.user.identities[0].identity_data.avatar_url
  const userNickName = JSON.parse(
    localStorage.getItem('supabase.auth.token') as string
  )?.currentSession.user.identities[0].identity_data.name
  const { data, isLoading, isError } = useGetAllRepoQuery({
    name: userName ? userName : '',
    token: userReducer.token
  })
  if (isError || !userReducer.token) return <NotLogin>你尚未登入</NotLogin>
  if (isLoading) return <>Loading...</>

  return (
    <div className='mx-auto mt-2 flex max-w-[1280px] flex-col items-stretch p-2 md:flex-row md:items-start'>
      <div className='flex w-full flex-row items-center border-b border-solid border-borderGray pb-2 md:mr-5 md:w-[20%] md:flex-col  md:items-start'>
        <img
          src={userPhoto}
          alt='userImage'
          className='mb-0 w-[50px] self-center rounded-circle border border-solid border-borderGray align-middle md:mb-2 md:w-[254px]'
        />
        <div className='ml-2 md:ml-0'>
          <h1 className='mb-[5px] text-[24px] font-medium'>{userNickName}</h1>
          <span className='text-textGray'>{userName}</span>
        </div>
      </div>
      <ul className='grow pb-1'>
        {data &&
          data.map(({ name }) => {
            return (
              <li
                onClick={() => {
                  localStorage.setItem('repo', name)
                  navigate(`/issueList`)
                }}
                key={name}
                className='cursor-pointer border-b border-solid border-borderGray py-3 pl-2 text-[20px] font-medium text-[rgb(9,105,218)] hover:bg-commonBgGray'>
                {name}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Home
