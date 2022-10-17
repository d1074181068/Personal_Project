//Libraries
import React from 'react'
import styled from 'styled-components'

type ButtonType = {
  bgcolor: string
  $text: string
  textColor: string
  border?: string
  hoverColor?: string
  hoverTextColor?: string
  clickFn?: (
    labelName?: string,
    labelColor?: string,
    labelDescription?: string
  ) => void
  $disabled?: boolean
  widthFull?: string
}
type ButtonProps = {
  bgcolor: string
  textColor: string
  border: string
  hoverColor: string
  hoverTextColor?: string
  $disabled?: string
  cursorEffect?: string
  widthFull?: string
}

const CreateNewLabelBtn = styled.button<ButtonProps>`
  width: ${(props) => (props.widthFull ? '100%' : 'unset')};
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
    color: ${(props) => props.hoverTextColor};
  }
`
function GithubBtn({
  bgcolor,
  $text,
  textColor,
  border,
  clickFn,
  hoverColor,
  hoverTextColor,
  $disabled,
  widthFull
}: ButtonType) {
  return (
    <CreateNewLabelBtn
      bgcolor={bgcolor}
      textColor={textColor}
      border={border ? border : 'none'}
      hoverColor={hoverColor ? hoverColor : bgcolor}
      hoverTextColor={hoverTextColor ? hoverTextColor : textColor}
      onClick={clickFn ? () => clickFn() : () => {}}
      $disabled={$disabled ? '0.5' : '1'}
      cursorEffect={$disabled ? 'no-drop' : 'pointer'}
      widthFull={widthFull}
      disabled={$disabled}>
      {$text}
    </CreateNewLabelBtn>
  )
}

export default GithubBtn
