import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

type NavbarButton = {
  iconComponent: JSX.Element
  $text: string
  isClick: (event: EventTarget) => void
  $isActive: boolean
}
type TypeActive = {
  $isActive: boolean
}
const RepoNavbarItem = styled.li<TypeActive>`
  min-height: 40px;
  border-bottom: ${(props) => (props.$isActive ? '2px solid #FD8C73' : 'none')};
  font-weight: ${(props) => (props.$isActive ? 'bolder' : 'normal')};
  cursor: pointer;
  :nth-child(3) {
    white-space: nowrap;
  }
`
const NavbarBtn = styled.a`
  line-height: 30px;
`
const IconWrapper = styled.div`
  margin-right: 10px;
`
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  border-radius: 6px;
  :hover {
    background-color: rgba(208, 215, 222, 0.32);
  }
`
function RepoNavbar({
  iconComponent,
  $text,
  isClick,
  $isActive
}: NavbarButton) {
  const navigate = useNavigate()
  return (
    <RepoNavbarItem
      onClick={(event) => {
        isClick(event.target)
        navigate('/')
      }}
      $isActive={$isActive}>
      <BtnWrapper>
        <IconWrapper
          onClick={(event) => {
            isClick(event.target)
          }}>
          {iconComponent}
        </IconWrapper>

        <NavbarBtn>{$text}</NavbarBtn>
      </BtnWrapper>
    </RepoNavbarItem>
  )
}

export default RepoNavbar
