//Libraries
import React from 'react'
import styled from 'styled-components'

type ButtonType = {
  bgcolor: string
  $text: string
  textColor: string
  border?: string
  clickFn?: () => void
}
type BuutonProps = {
  bgcolor: string
  textColor: string
  border: string
}

const CreateNewLabelBtn = styled.button<BuutonProps>`
  border-radius: 6px;
  padding: 8px 12px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgcolor};
  border: ${(props) => props.border};
  cursor: pointer;
  white-space: nowrap;
`
function GithubBtn({ bgcolor, $text, textColor, border, clickFn }: ButtonType) {
  return (
    <CreateNewLabelBtn
      bgcolor={bgcolor}
      textColor={textColor}
      border={border ? border : 'none'}
      onClick={clickFn ? () => clickFn() : () => {}}
    >
      {$text}
    </CreateNewLabelBtn>
  )
}

export default GithubBtn
