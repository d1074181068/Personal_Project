//Libraries
import React, { useState } from 'react'
import styled from 'styled-components'
import { TriangleDownIcon, CheckIcon } from '@primer/octicons-react'

//components
type PropType = {
  text: string
  dropdownText: string[]
}
type IconPropsType = {
  isClick: string
}
type DropdownPropsType = {
  open: string
}
const Wrapper = styled.div`
  position: relative;
`
const Btn = styled.button`
  color: rgb(87, 96, 106);
  cursor: pointer;
  border: 0;
  background-color: transparent;
`

const DropdownList = styled.ul<DropdownPropsType>`
  display: ${(props) => props.open};
  width: 300px;
  background-color: white;
  position: absolute;
  top: 20px;
  right: 0;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  list-style: none;
  padding-left: 0px;
`
const DropdownItem = styled.li`
  position: relative;
  padding: 10px 30px;
  border-bottom: 1px solid rgb(208, 215, 222);
  cursor: pointer;
  :hover {
    background-color: rgb(246, 248, 250);
  }
  :first-child {
    padding-left: 10px;
    font-weight: 500;
  }
  :last-child {
    border-bottom: none;
  }
`
const DropdownCheckIcon = styled(CheckIcon)<IconPropsType>`
  display: ${(props) => props.isClick}!important;
  position: absolute;
  left: 8px;
  top: 9px;
`
function Dropdown({ text, dropdownText }: PropType) {
  const [currentClickItem, setCurrentClickItem] = useState(1)
  const [dropdownStatus, setDropdownStatus] = useState(false)
  return (
    <Wrapper>
      <Btn onClick={() => setDropdownStatus((prev) => !prev)}>
        {text}
        <TriangleDownIcon />
      </Btn>
      <DropdownList open={dropdownStatus ? 'block' : 'none'}>
        {dropdownText.map((item, index) => {
          return index === 0 ? (
            <DropdownItem key={index}>{text}</DropdownItem>
          ) : (
            <DropdownItem
              key={index}
              onClick={() => setCurrentClickItem(index)}
            >
              <DropdownCheckIcon
                isClick={index === currentClickItem ? 'block' : 'none'}
              />
              {item}
            </DropdownItem>
          )
        })}
      </DropdownList>
    </Wrapper>
  )
}

export default Dropdown
