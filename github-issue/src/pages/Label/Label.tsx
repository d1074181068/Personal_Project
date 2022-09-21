//Libraries
import React, { useState } from 'react'
import styled from 'styled-components'
import { TagIcon, MilestoneIcon, SearchIcon } from '@primer/octicons-react'
//components
import GithubBtn from '../../components/Content/GithubBtn'
import Dropdown from '../../components/Content/Dropdown'
import LabelListItem from './LabelListItem'

type SubNavType = {
  $isAcitve: boolean
}
const Wrapper = styled.main`
  padding: 24px 32px;
`
const Navbar = styled.div`
  display: flex;
  align-items: center;
  max-width: 1216px;
  margin: 0 auto;
  flex-wrap: wrap;
`
const SubNavButtonWrapper = styled.div``
const SubNavLabelBtn = styled.button<SubNavType>`
  padding: 8px 16px;
  border-radius: 6px 0px 0px 6px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
  background-color: ${(props) =>
    props.$isAcitve ? 'rgb(9,105,218)' : 'white'};
  color: ${(props) => (props.$isAcitve ? 'white' : 'black')};
`
const LabelBtnIcon = styled(TagIcon)`
  margin-right: 5px;
`
const SubNavMilestonesBtn = styled.button<SubNavType>`
  padding: 8px 16px;
  border-radius: 0px 6px 6px 0px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-left: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isAcitve ? 'rgb(9,105,218)' : 'white'};
  color: ${(props) => (props.$isAcitve ? 'white' : 'black')};
`
const MilestonesBtnIcon = styled(MilestoneIcon)`
  margin-right: 5px;
`
const SearchBarWrapper = styled.div`
  position: relative;
  margin-left: 10px;
  @media (max-width: 681px) {
    order: 1;
    margin-left: 0;
    margin-top: 20px;
  }
`
const SearchBar = styled.input.attrs({ placeholder: 'Search all labels' })`
  width: 320px;
  height: 32px;
  border: 1px solid rgb(208, 215, 222);
  background-color: rgb(246, 248, 250);
  border-radius: 6px;
  padding-left: 30px;
`

const SearchBarIcon = styled(SearchIcon)`
  position: absolute;
  left: 8px;
  top: 8px;
  fill: rgb(87, 96, 106);
`
const LabelListWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid rgb(208, 215, 222);
  max-width: 1216px;
  margin: 20px auto;
`
const LabelListHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(246, 248, 250);
  border-bottom: 1px solid rgb(208, 215, 222);
`
const LabelQuantity = styled.h3`
  font-weight: 500;
`

const LabelList = styled.ul``

function Label() {
  const [subNavActive, setSubNavActive] = useState(true)
  return (
    <Wrapper>
      <Navbar>
        <SubNavButtonWrapper>
          <SubNavLabelBtn
            $isAcitve={subNavActive}
            onClick={() => setSubNavActive((prev) => !prev)}
          >
            <LabelBtnIcon />
            Labels
          </SubNavLabelBtn>
          <SubNavMilestonesBtn
            $isAcitve={!subNavActive}
            onClick={() => setSubNavActive((prev) => !prev)}
          >
            <MilestonesBtnIcon />
            Milestones
          </SubNavMilestonesBtn>
        </SubNavButtonWrapper>
        <SearchBarWrapper>
          <SearchBar />
          <SearchBarIcon />
        </SearchBarWrapper>
        <GithubBtn
          bgcolor={'rgb(46,164,78)'}
          textColor={'white'}
          $text={'New Label'}
        />
      </Navbar>
      <LabelListWrapper>
        <LabelListHeader>
          <LabelQuantity>8 labels</LabelQuantity>
          <Dropdown
            text={'Sort'}
            dropdownText={[
              '',
              'Alphabetically',
              'Reverse alphabetically',
              'Most issues',
              'Fewest issues'
            ]}
          />
        </LabelListHeader>
        <LabelList>
          <LabelListItem
            labelName={'Frank'}
            labelDesc={'Frank is coming'}
            useLabelIssueQty={2}
            colorCode={'FF0000'}
          />
          <LabelListItem
            labelName={'Frank'}
            labelDesc={'Frank is coming'}
            useLabelIssueQty={2}
            colorCode={'FF0000'}
          />
        </LabelList>
      </LabelListWrapper>
    </Wrapper>
  )
}

export default Label
