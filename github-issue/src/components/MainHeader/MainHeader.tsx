//Libraries
import React from 'react'
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
  padding: 16px 32px;
`
const RepoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
`

const repoNavText = [
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
      <RepoNavbar />
    </Wrapper>
  )
}
// {repoNavText.map((item, index) => {
//   return item[0]
// })}
export default MainHeader
