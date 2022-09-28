import React, { useState } from 'react'
import styled from 'styled-components'
import { TagIcon, MilestoneIcon } from '@primer/octicons-react'

type SubNavType = {
  $isAcitve: boolean
}
const Wrapper = styled.div`
  display: flex;
`
const SubNavLabelBtn = styled.button<SubNavType>`
  border: 1px solid rgb(208, 215, 222);
  padding: 8px 16px;
  border-radius: 6px 0px 0px 6px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isAcitve ? 'rgb(9,105,218)' : 'white'};
  color: ${(props) => (props.$isAcitve ? 'white' : 'black')};
`
const LabelBtnIcon = styled(TagIcon)`
  margin-right: 5px;
`
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
`
const SubNavMilestonesBtn = styled.button<SubNavType>`
  border: 1px solid rgb(208, 215, 222);
  padding: 8px 16px;
  border-radius: 0px 6px 6px 0px;
  border-left: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isAcitve ? 'rgb(9,105,218)' : 'white'};
  color: ${(props) => (props.$isAcitve ? 'white' : 'black')};
`
const MilestonesBtnIcon = styled(MilestoneIcon)`
  margin-right: 5px;
`
const Qty = styled.span`
  border-radius: 50%;
  min-width: 20px;
  line-height: 18px;
  padding: 0px 6px;
  margin-left: 5px;
  background-color: rgb(234, 238, 242);
`
function SubNavButton({
  labelQuantity,
  unsetBg
}: {
  labelQuantity?: number
  unsetBg?: boolean
}) {
  const [subNavActive, setSubNavActive] = useState(true)
  return (
    <Wrapper>
      <SubNavLabelBtn
        $isAcitve={unsetBg ? false : subNavActive}
        onClick={() => setSubNavActive((prev) => !prev)}
      >
        <BtnWrapper>
          <LabelBtnIcon />
          Labels
          {labelQuantity && <Qty>{labelQuantity}</Qty>}
        </BtnWrapper>
      </SubNavLabelBtn>
      <SubNavMilestonesBtn
        $isAcitve={!subNavActive}
        onClick={() => setSubNavActive((prev) => !prev)}
      >
        <BtnWrapper>
          <MilestonesBtnIcon />
          Milestones
        </BtnWrapper>
      </SubNavMilestonesBtn>
    </Wrapper>
  )
}

export default SubNavButton
