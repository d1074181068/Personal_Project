//Libraries
import React, { useState } from 'react'
import styled from 'styled-components'
import { KebabHorizontalIcon } from '@primer/octicons-react'
//components
import LabelItem from './LabelItem'

type PropsType = {
  labelName: string
  labelDesc: string
  useLabelIssueQty: number
  colorCode: string
}
type MoreActionBtnType = {
  bgColor: string
  fillColor: string
}
type MoreActionWrapperPropsType = {
  display: string
}

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid rgb(208, 215, 222);
  padding: 20px 0px 20px 20px;
  :last-child {
    border-bottom: none;
  }
`
const LabelDesc = styled.span`
  color: rgb(87, 96, 106);
  font-size: 12px;
  @media (max-width: 767px) {
    display: none;
  }
`
const LabelUserStatus = styled.a`
  color: rgb(87, 96, 106);
  font-size: 12px;
  :hover {
    color: #0969da;
    text-decoration: underline;
  }
  @media (max-width: 767px) {
    display: none;
  }
`

const ActionBtnWrapper = styled.div`
  display: block;
  @media (max-width: 1011px) {
    display: none;
  }
`

const ActionBtn = styled.a`
  margin-right: 20px;
  font-size: 12px;
  color: rgb(87, 96, 106);
`

const MobileMoreBtnWrapper = styled.div`
  position: relative;
  display: none;
  @media (max-width: 1011px) {
    display: block;
  }
`
const MobileActionBtnIcon = styled(KebabHorizontalIcon)``

const MobileMoreActionBtn = styled.button<MoreActionBtnType>`
  display: block;
  padding: 6px 12px;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  margin-right: 20px;
  cursor: pointer;
  background-color: ${(props) => props.bgColor};
  & > ${MobileActionBtnIcon} {
    fill: ${(props) => props.fillColor};
  }
  :hover {
    background-color: #0969da;
    & > ${MobileActionBtnIcon} {
      fill: white;
    }
  }
`
const MobileActionBtnWrapper = styled.div<MoreActionWrapperPropsType>`
  position: absolute;
  top: 35px;
  right: 20px;
  z-index: 10;
  background-color: white;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  width: 158px;
  display: ${(props) => props.display};
`
const MobileActionBtn = styled.a`
  padding: 10px;
  display: block;
  :hover {
    background-color: #0969da;
    color: white;
  }
  :first-child {
    border-radius: 6px 6px 0px 0px;
  }
  :last-child {
    border-radius: 0px 0px 6px 6px;
  }
`

function LabelListItem({
  labelName,
  labelDesc,
  useLabelIssueQty,
  colorCode
}: PropsType) {
  const [moreActionBtnActive, setMoreActionBtnActive] = useState(false)
  return (
    <Item>
      <LabelItem labelName={labelName} colorCode={colorCode} />
      <LabelDesc>{labelDesc}</LabelDesc>
      <LabelUserStatus>
        {useLabelIssueQty} open issue or pull request
      </LabelUserStatus>
      <ActionBtnWrapper>
        <ActionBtn>Edit</ActionBtn>
        <ActionBtn>Delete</ActionBtn>
      </ActionBtnWrapper>
      <MobileMoreBtnWrapper>
        <MobileMoreActionBtn
          onClick={() => setMoreActionBtnActive((prev) => !prev)}
          onBlur={() => setMoreActionBtnActive(false)}
          bgColor={moreActionBtnActive ? '#0969da' : 'white'}
          fillColor={moreActionBtnActive ? 'white' : 'black'}
        >
          <MobileActionBtnIcon />
        </MobileMoreActionBtn>
        <MobileActionBtnWrapper
          display={moreActionBtnActive ? 'block' : 'none'}
        >
          <MobileActionBtn>Edit</MobileActionBtn>
          <MobileActionBtn>Delete</MobileActionBtn>
        </MobileActionBtnWrapper>
      </MobileMoreBtnWrapper>
    </Item>
  )
}

export default LabelListItem
