//Libraries
import React from 'react'
import styled from 'styled-components'

//components
import LabelItem from './LabelItem'

type PropsType = {
  labelName: string
  labelDesc: string
  useLabelIssueQty: number
  colorCode: string
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
`
const ActionBtnWrapper = styled.div``

const ActionBtn = styled.a`
  margin-right: 20px;
  font-size: 12px;
  color: rgb(87, 96, 106);
`

function LabelListItem({
  labelName,
  labelDesc,
  useLabelIssueQty,
  colorCode
}: PropsType) {
  return (
    <Item>
      <LabelItem labelName={labelName} colorCode={colorCode} />
      <LabelDesc>{labelDesc}</LabelDesc>
      <LabelDesc>{useLabelIssueQty} open issue or pull request</LabelDesc>
      <ActionBtnWrapper>
        <ActionBtn>Edit</ActionBtn>
        <ActionBtn>Delete</ActionBtn>
      </ActionBtnWrapper>
    </Item>
  )
}

export default LabelListItem
