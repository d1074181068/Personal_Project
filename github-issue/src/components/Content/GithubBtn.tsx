//Libraries
import React from 'react'
import styled from 'styled-components'

type ButtonType = {
  bgcolor: string
  $text: string
  textColor: string
}
type BuutonProps = {
  bgcolor: string
  textColor: string
}
const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`
const CreateNewLabelBtn = styled.button<BuutonProps>`
  border-radius: 6px;
  padding: 10px 12px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgcolor};
`
function GithubBtn({ bgcolor, $text, textColor }: ButtonType) {
  return (
    <Wrapper>
      <CreateNewLabelBtn bgcolor={bgcolor} textColor={textColor}>
        {$text}
      </CreateNewLabelBtn>
    </Wrapper>
  )
}

export default GithubBtn
