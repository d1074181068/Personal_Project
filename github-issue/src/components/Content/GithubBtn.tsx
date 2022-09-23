//Libraries
import React from 'react'
import styled from 'styled-components'

type ButtonType = {
  bgcolor: string
  $text: string
  textColor: string
  border?: string
  hoverColor?: string
  clickFn?: () => void
}
type BuutonProps = {
  bgcolor: string
  textColor: string
  border: string
  hoverColor: string
}

const CreateNewLabelBtn = styled.button<BuutonProps>`
  border-radius: 6px;
  padding: 8px 12px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgcolor};
  border: ${(props) => props.border};
  cursor: pointer;
  white-space: nowrap;
  :hover {
    background-color: ${(props) => props.hoverColor};
  }
`
function GithubBtn({
  bgcolor,
  $text,
  textColor,
  border,
  clickFn,
  hoverColor
}: ButtonType) {
  return (
    <CreateNewLabelBtn
      bgcolor={bgcolor}
      textColor={textColor}
      border={border ? border : 'none'}
      hoverColor={hoverColor ? hoverColor : bgcolor}
      onClick={clickFn ? () => clickFn() : () => {}}
    >
      {$text}
    </CreateNewLabelBtn>
  )
}

export default GithubBtn
