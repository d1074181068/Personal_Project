import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { resetIssueContent } from '../../redux/issueSlice'
import { useDispatch } from 'react-redux'
type NavbarButton = {
  iconComponent: JSX.Element
  $text: string
  isClick: (event: EventTarget) => void
  $isActive: boolean
  index: number
  issueDataLength: number
}
type TypeActive = {
  $isActive: boolean
}
const RepoNavbarItem = styled.li<TypeActive>`
  color: rgb(36, 41, 47);
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
  :nth-child(1) {
    padding-left: 8px;
  }
  border-radius: 6px;
  :hover {
    background-color: rgba(208, 215, 222, 0.32);
  }
`
const Count = styled.span`
  margin-left: 5px;
  padding: 4px 6px;
  border-radius: 24px;
  font-weight: normal;
  font-size: 12px;
  background-color: rgba(175, 184, 193, 0.2);
`

function RepoNavbar({
  index,
  iconComponent,
  $text,
  isClick,
  $isActive,
  issueDataLength
}: NavbarButton) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <RepoNavbarItem
      onClick={(event) => {
        isClick(event.target)
        if (index === 1) {
          dispatch(resetIssueContent())
          navigate('/issueList')
        }
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
        {index === 1 && <Count>{issueDataLength}</Count>}
      </BtnWrapper>
    </RepoNavbarItem>
  )
}

export default RepoNavbar
