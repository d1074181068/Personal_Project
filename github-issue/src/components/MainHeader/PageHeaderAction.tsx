import React from 'react'
import styled from 'styled-components'

const ActionButton = styled.button`
  background-color: rgb(246, 248, 250);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 5px 12px;
  margin-right: 10px;
  cursor: pointer;
`
const ActionButtonTxt = styled.span`
  display: inline-block;
  margin-left: 10px;
  margin-right: 5px;
`
const ActionButtonNumber = styled.span`
  display: inline-block;
  background-color: rgba(27, 31, 36, 0.08);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  padding-top: 4px;
`
type PropsType = {
  iconComponent: JSX.Element
  $text: string
  $number?: number
  dropdownIcon?: JSX.Element
}
function PageHeaderAction({
  iconComponent,
  $text,
  $number,
  dropdownIcon
}: PropsType) {
  return (
    <ActionButton>
      {iconComponent}
      <ActionButtonTxt>{$text}</ActionButtonTxt>
      {$number === undefined ? null : (
        <ActionButtonNumber>{$number}</ActionButtonNumber>
      )}
      {dropdownIcon}
    </ActionButton>
  )
}

export default PageHeaderAction
