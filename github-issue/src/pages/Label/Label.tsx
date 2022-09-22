//Libraries
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TagIcon, MilestoneIcon, SearchIcon } from '@primer/octicons-react'

import api from '../../utils/api'

//components
import GithubBtn from '../../components/Content/GithubBtn'
import Dropdown from '../../components/Content/Dropdown'
import LabelListItem from './LabelListItem'
import HandleLabel from './HandleLabel'

type SubNavType = {
  $isAcitve: boolean
}
type LabelControlerType = {
  display: string
}
type LabelsArrType = {
  color: string
  default: boolean
  description: string | null
  id: number
  name: string
  node_id: string
  url: string
}[]

const Wrapper = styled.main`
  padding: 24px 32px 142px;
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

const NewLabelBtnWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
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

const CreateLabelWrapper = styled.div<LabelControlerType>`
  display: ${(props) => props.display};
  max-width: 1216px;
  margin: 20px auto 0px;
  background-color: rgb(245, 248, 250);
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
`

function Label() {
  const [subNavActive, setSubNavActive] = useState(true)
  const [handleLabelOpen, setHandleLabelOpen] = useState(false)
  const [allLabels, setAllLabels] = useState<LabelsArrType>()
  useEffect(() => {
    async function getLabels() {
      const data = await api.getAllLabels()
      setAllLabels(data)
    }
    getLabels()
  }, [])
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
        <NewLabelBtnWrapper>
          <GithubBtn
            bgcolor={'rgb(46,164,78)'}
            textColor={'white'}
            $text={'New Label'}
            clickFn={() => setHandleLabelOpen((prev) => !prev)}
          />
        </NewLabelBtnWrapper>
      </Navbar>
      <CreateLabelWrapper display={handleLabelOpen ? 'block' : 'none'}>
        <HandleLabel
          initLabelText={'Label preview'}
          mainTitle={'Label name'}
          mainPlaceholder={'Label name'}
          subTitle={'Description'}
          subPlaceholder={'Description (optional)'}
          confirmButtonText={'Create label'}
          undoButtonText={'Cancel'}
          cancelClickFn={() => setHandleLabelOpen(false)}
        />
      </CreateLabelWrapper>

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
          {allLabels &&
            allLabels.map(({ name, description, color }, index) => {
              return (
                <LabelListItem
                  labelName={name}
                  labelDesc={description ? description : ''}
                  useLabelIssueQty={2}
                  colorCode={`#${color}`}
                  key={`${name}-${color}-${index}`}
                />
              )
            })}
        </LabelList>
      </LabelListWrapper>
    </Wrapper>
  )
}

export default Label
