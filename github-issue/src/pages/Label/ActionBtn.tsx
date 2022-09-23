import React from 'react'
import styled from 'styled-components'

type PropsType = {
  btnText: string
  clickFn?: () => void
}

const Btn = styled.a`
  font-size: 12px;
  color: rgb(87, 96, 106);
  :hover {
    text-decoration: underline;
    color: #0969da;
  }
`
function ActionBtn({ btnText, clickFn }: PropsType) {
  return <Btn onClick={clickFn ? () => clickFn() : () => {}}>{btnText}</Btn>
}

export default ActionBtn
