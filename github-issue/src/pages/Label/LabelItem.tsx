import React from 'react'
import styled from 'styled-components'

type PropsType = {
  labelName: string
  colorCode: string
}
type LabelPropsType = {
  colorCode: string
}
const Label = styled.span<LabelPropsType>`
  background-color: #${(props) => props.colorCode};
  color: white;
  border-radius: 24px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
`

function LabelItem({ labelName, colorCode }: PropsType) {
  return <Label colorCode={colorCode}>{labelName}</Label>
}

export default LabelItem
