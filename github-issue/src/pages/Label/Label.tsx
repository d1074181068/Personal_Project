import styled from 'styled-components'

type PropsType = {
  labelName: string
  colorCode: string
  textColor: string
  icon?: JSX.Element
  padding?: string
  border?: string
}
type LabelPropsType = {
  colorCode: string
  textColor: string
  padding?: string
  border?: string
}
const Wrapper = styled.span<LabelPropsType>`
  background-color: ${(props) => props.colorCode};
  color: ${(props) => props.textColor};
  border-radius: 24px;
  padding: ${(props) => (props.padding ? props.padding : '4px 10px')};
  font-size: 12px;
  font-weight: 500;
  border: ${(props) => (props.border ? props.border : 'none')};
`
const LabelIcon = styled.span`
  display: inline-block;
  margin-right: 4px;
`

function Label({
  labelName,
  colorCode,
  textColor,
  icon,
  padding,
  border
}: PropsType) {
  return (
    <Wrapper
      colorCode={colorCode}
      textColor={textColor}
      border={
        colorCode.toUpperCase() === '#FFFFFF'
          ? '1px solid rgb(191,191,191)'
          : border
      }
      padding={padding}>
      {icon && <LabelIcon>{icon}</LabelIcon>}
      {labelName}
    </Wrapper>
  )
}

export default Label
