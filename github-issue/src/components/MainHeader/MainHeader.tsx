//Libraries
import {
  BookIcon,
  CodeIcon,
  EyeIcon,
  GearIcon,
  GitPullRequestIcon,
  GraphIcon,
  IssueOpenedIcon,
  PinIcon,
  PlayIcon,
  RepoForkedIcon,
  RepoIcon,
  ShieldLockIcon,
  StarIcon,
  TableIcon,
  TriangleDownIcon
} from '@primer/octicons-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

//components
import PageHeaderAction from './PageHeaderAction'
import RepoNavbar from './RepoNavbar'

//custom
import { useGetAllIssueQuery } from '../../redux/issueApiSlice'
import { RootState } from '../../redux/store'

type FontType = {
  fontBold: boolean
}
const Wrapper = styled.div`
  background-color: rgb(246, 248, 250);
  padding: 16px 32px 0px;
`
const RepoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 959px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const RepoBookIcon = styled(RepoIcon)`
  margin-right: 5px;
`
const RepoTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`
const RepoTag = styled.a<FontType>`
  margin: 0px 5px;
  color: #0969da;
  font-weight: ${(props) => (props.fontBold ? 'bold' : 'normal')};
`
const ActionWrapper = styled.div`
  display: flex;
  @media (max-width: 959px) {
    margin-top: 20px;
    align-self: flex-end;
  }
  @media (max-width: 767px) {
    display: none;
  }
`

const RepoNavbarList = styled.ul`
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: auto;
`

const repoNavArr = [
  [<CodeIcon />, 'Code'],
  [<IssueOpenedIcon />, 'Issues'],
  [<GitPullRequestIcon />, 'Pull requests'],
  [<PlayIcon />, 'Actions'],
  [<TableIcon />, 'Projects'],
  [<BookIcon />, 'Wiki'],
  [<ShieldLockIcon />, 'Security'],
  [<GraphIcon />, 'Insights'],
  [<GearIcon />, 'Settings']
]

const pageActionArr = [
  [<PinIcon />, 'Pin'],
  [<EyeIcon />, 'Unwatch', 1, <TriangleDownIcon />],
  [<RepoForkedIcon />, 'Fork', 0, <TriangleDownIcon />],
  [<StarIcon />, 'Star', 0, <TriangleDownIcon />]
]
function MainHeader() {
  const repo = sessionStorage.getItem('repo')
  const userName = localStorage.getItem('userName')
  const [clickItem, setClickItem] = useState('Issues')
  const { userReducer, queryReducer } = useSelector((store: RootState) => store)
  const navigate = useNavigate()
  function isClick(event: EventTarget) {
    if ((event as HTMLElement).tagName === 'svg') {
      setClickItem(
        (
          ((event as HTMLElement).parentElement as HTMLElement)
            .parentElement as HTMLElement
        ).textContent as string
      )
      return
    }
    setClickItem((event as HTMLLIElement).textContent as string)
  }
  const { data: issueData } = useGetAllIssueQuery({
    name: userName ? userName : '',
    repo: repo ? repo : '',
    page: queryReducer.page,
    query: ''
  })

  if (!userReducer.token || !repo) {
    return <></>
  }
  return (
    <Wrapper>
      <RepoWrapper>
        <RepoTitleWrapper>
          <RepoBookIcon />
          <RepoTag fontBold={false} onClick={() => navigate('/')}>
            {userName}
          </RepoTag>
          /
          <RepoTag fontBold onClick={() => navigate('/issueList')}>
            {repo}
          </RepoTag>
        </RepoTitleWrapper>
        <ActionWrapper>
          {pageActionArr.map((item, index) => {
            return (
              <PageHeaderAction
                key={index}
                iconComponent={item[0] as JSX.Element}
                $text={item[1] as string}
                $number={
                  item[2]
                    ? (item[2] as number | undefined)
                    : item[2] === 0
                    ? item[2]
                    : undefined
                }
                dropdownIcon={
                  item[3] ? (item[3] as JSX.Element | undefined) : undefined
                }
              />
            )
          })}
        </ActionWrapper>
      </RepoWrapper>
      <RepoNavbarList>
        {repoNavArr.map((item, index) => {
          return (
            <RepoNavbar
              index={index}
              key={index}
              iconComponent={item[0] as JSX.Element}
              $text={item[1] as string}
              isClick={isClick}
              $isActive={clickItem === item[1] ? true : false}
              issueDataLength={issueData ? issueData.length : 0}
            />
          )
        })}
      </RepoNavbarList>
    </Wrapper>
  )
}
export default MainHeader
