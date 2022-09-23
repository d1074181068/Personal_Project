//Libraries
import React, { useState } from 'react'
import styled from 'styled-components'
import {
  CodeIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  PlayIcon,
  TableIcon,
  BookIcon,
  ShieldLockIcon,
  GraphIcon,
  GearIcon,
  RepoIcon,
  PinIcon,
  EyeIcon,
  RepoForkedIcon,
  StarIcon,
  TriangleDownIcon
} from '@primer/octicons-react'

//components
import PageHeaderAction from './PageHeaderAction'
import RepoNavbar from './RepoNavbar'

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
  margin-left: 10px;
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
  const [clickItem, setClickItem] = useState('')
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
  return (
    <Wrapper>
      <RepoWrapper>
        <RepoTitleWrapper>
          <RepoBookIcon />
          <RepoTag fontBold={false}>d1074181068</RepoTag>/
          <RepoTag fontBold>Personal_Project</RepoTag>
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
          return clickItem === item[1] ? (
            <RepoNavbar
              key={index}
              iconComponent={item[0] as JSX.Element}
              $text={item[1] as string}
              isClick={isClick}
              $isActive={true}
            />
          ) : (
            <RepoNavbar
              key={index}
              iconComponent={item[0] as JSX.Element}
              $text={item[1] as string}
              isClick={isClick}
              $isActive={false}
            />
          )
        })}
      </RepoNavbarList>
    </Wrapper>
  )
}
export default MainHeader
