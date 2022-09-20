import React from 'react'
import styled from 'styled-components'

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
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding-bottom: 15px;
  border-bottom: ${(props) => (props.$isActive ? '2px solid orange' : 'none')};
  font-weight: ${(props) => (props.$isActive ? 'bolder' : 'normal')};
  cursor: pointer;
  :nth-child(3) {
    white-space: nowrap;
  }
`
const IconWrapper = styled.div`
  margin-right: 10px;
`
function RepoNavbar({
  iconComponent,
  $text,
  isClick,
  $isActive
}: NavbarButton) {
  return (
    <RepoNavbarItem
      onClick={(event) => {
        isClick(event.target)
      }}
      $isActive={$isActive}
    >
      <IconWrapper
        onClick={(event) => {
          isClick(event.target)
        }}
      >
        {iconComponent}
      </IconWrapper>
      {$text}
    </RepoNavbarItem>
  )
}

export default RepoNavbar
