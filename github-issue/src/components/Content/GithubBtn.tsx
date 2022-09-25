//Libraries
import React from 'react'
import styled from 'styled-components'

type ButtonType = {
  bgcolor: string
  $text: string
  textColor: string
  border?: string
  hoverColor?: string
  clickFn?: (
    labelName?: string,
    labelColor?: string,
    labelDescription?: string
  ) => void
  $disabled?: boolean
}
type ButtonProps = {
  bgcolor: string
  textColor: string
  border: string
  hoverColor: string
  $disabled?: string
  cursorEffect?: string
}

const CreateNewLabelBtn = styled.button<ButtonProps>`
  border-radius: 6px;
  padding: 8px 12px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgcolor};
  border: ${(props) => props.border};
  cursor: ${(props) => props.cursorEffect};
  white-space: nowrap;
  opacity: ${(props) => props.$disabled};
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
  hoverColor,
  $disabled
}: ButtonType) {
  return (
    <CreateNewLabelBtn
      bgcolor={bgcolor}
      textColor={textColor}
      border={border ? border : 'none'}
      hoverColor={hoverColor ? hoverColor : bgcolor}
      onClick={clickFn ? () => clickFn() : () => {}}
      $disabled={$disabled ? '0.5' : '1'}
      cursorEffect={$disabled ? 'no-drop' : 'pointer'}
      disabled={$disabled}
    >
      {$text}
    </CreateNewLabelBtn>
  )
}

export default GithubBtn
