import React from 'react'
import styled from 'styled-components'

type PropsType = {
  labelName: string
  colorCode: string
  textColor: string
}
type LabelPropsType = {
  colorCode: string
  textColor: string
}
const Label = styled.span<LabelPropsType>`
  background-color: ${(props) => props.colorCode};
  color: ${(props) => props.textColor};
  border-radius: 24px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
`

function LabelItem({ labelName, colorCode, textColor }: PropsType) {
  return (
    <Label colorCode={colorCode} textColor={textColor}>
      {labelName}
    </Label>
  )
}

export default LabelItem
