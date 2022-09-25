import React from 'react'
import styled from 'styled-components'

// import { SearchBarIcon } from './Header'
type TypeClick = { $isActive: boolean }
type TypeFocus = { $isFocus: boolean }
type PropsType = {
  listActive: boolean
  searchBarStyle: boolean
  userPhoto: string
  setSearchBarStyle: React.Dispatch<React.SetStateAction<boolean>>
  signOut: () => {}
  signInGithub: () => {}
}
const Wrapper = styled.ul<TypeClick>`
  display: none;
  @media (max-width: 768px) {
    display: ${(props) => (props.$isActive ? 'block' : 'none')};
    background-color: #24292f;
    padding: 10px 20px;
  }
`
const MobileLinkBtn = styled.a`
  display: block;
  width: 100%;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  font-weight: bold;
  padding: 15px 0px;
  :hover {
    color: rgba(255, 255, 255, 0.7);
  }
`
const MobileSearchWrapper = styled.div<TypeFocus>`
  position: relative;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding-bottom: 20px;
`
const MobileSearchBar = styled.input.attrs({
  placeholder: 'Search or jump to...'
})<TypeFocus>`
  background-color: ${(props) => (props.$isFocus ? 'white' : '#24292f')};
  width: 100%;
  color: ${(props) => (props.$isFocus ? 'black' : 'white')};
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  height: 30px;
  padding: 0px 12px;
  font-size: 14px;

  ::placeholder {
    color: ${(props) =>
      props.$isFocus ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  }
  :focus-visible {
    outline: 0;
  }
`

const MobileSignBtn = styled.button`
  border: 1px solid white;
  color: white;
  background-color: #24292f;
  padding: 4px 8px;
  margin: 15px 0px 5px;
  cursor: pointer;
`

const SearchBarIcon = styled.span`
  display: block;
  position: absolute;
  color: rgba(255, 255, 255, 0.4);
  top: 5px;
  right: 10px;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  text-align: center;
  padding-top: 3.5px;
  font-size: 10px;
`
const mobileNavBarTxt: string[] = [
  '',
  'Dashboard',
  'Pull requests',
  'Issues',
  'Codespaces',
  'Marketplace',
  'Explore',
  'Sponsors',
  'Settings',
  ''
]
function MobileLink({
  listActive,
  searchBarStyle,
  userPhoto,
  setSearchBarStyle,
  signOut,
  signInGithub
}: PropsType) {
  return (
    <Wrapper $isActive={listActive}>
      {mobileNavBarTxt.map((item, index) => {
        if (index === 0) {
          return (
            <li key={index}>
              <MobileSearchWrapper $isFocus={searchBarStyle}>
                <MobileSearchBar
                  $isFocus={searchBarStyle}
                  onFocus={() => setSearchBarStyle(true)}
                  onBlur={() => setSearchBarStyle(false)}
                />
                <SearchBarIcon>/</SearchBarIcon>
              </MobileSearchWrapper>
            </li>
          )
        } else if (index === mobileNavBarTxt.length - 1) {
          return (
            <li key={index}>
              <MobileSignBtn
                onClick={userPhoto ? () => signOut() : () => signInGithub()}
              >
                {userPhoto ? 'signOut' : 'signIn'}
              </MobileSignBtn>
            </li>
          )
        } else {
          return (
            <li key={index}>
              <MobileLinkBtn>{item}</MobileLinkBtn>
            </li>
          )
        }
      })}
    </Wrapper>
  )
}

export default MobileLink
