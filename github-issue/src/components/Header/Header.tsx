//Libraries
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  MarkGithubIcon,
  BellIcon,
  PlusIcon,
  TriangleDownIcon,
  ThreeBarsIcon
} from '@primer/octicons-react'
//custom
import api from '../../utils/api'
import { supabase } from '../../utils/client'
import { UserType, Session } from '../../types/supabaseType'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 16px;
`
const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`
const HumbergerBtn = styled.a`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`
const HumbergerBtnSVG = styled(ThreeBarsIcon)`
  @media (max-width: 768px) {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`
const Icon = styled(MarkGithubIcon)`
  width: 32px;
  height: 32px;
  margin-right: 16px;
  :hover {
    fill: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }
  @media (max-width: 768px) {
    margin-right: 0;
  }
`
const SearchWrapper = styled.div<TypeFocus>`
  position: relative;
  width: 272px;
  margin-right: 16px;
  transition: 0.2s;
  flex-grow: ${(props) => (props.$isFocus ? '1' : 'unset')};
  @media (max-width: 767px) {
    display: none;
  }
`
type TypeFocus = { $isFocus: boolean }
const SearchBar = styled.input.attrs({
  placeholder: 'Search or jump to...'
})<TypeFocus>`
  position: relative;
  background-color: ${(props) => (props.$isFocus ? 'white' : 'black')};
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
const Link = styled.ul`
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`
const LinkBtn = styled.a`
  margin-right: 16px;
  color: white;
  font-weight: bold;
  :hover {
    color: rgba(255, 255, 255, 0.7);
  }
`
const LinkText = styled.span`
  @media (max-width: 1011px) {
    display: none;
  }
`
type TypeClick = { $isActive: boolean }
const MobileLink = styled.ul<TypeClick>`
  display: none;
  @media (max-width: 768px) {
    display: ${(props) => (props.$isActive ? 'block' : 'none')};
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background-color: black;
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
  background-color: ${(props) => (props.$isFocus ? 'white' : 'black')};
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

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-grow: 1;
    justify-content: flex-end;
  }
`
const NotificationsBtn = styled(BellIcon)`
  margin-right: 12px;
  cursor: pointer;
  :hover {
    fill: rgba(255, 255, 255, 0.7);
  }
`

const MoreActionBtnIcon = styled(PlusIcon)``
const DropDown = styled(TriangleDownIcon)``
const MoreActionButton = styled.a`
  margin-right: 12px;
  :hover {
    & > ${MoreActionBtnIcon}, & > ${DropDown} {
      fill: rgba(255, 255, 255, 0.7);
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const SignBtn = styled.button`
  border: 1px solid white;
  color: white;
  background-color: black;
  padding: 4px 8px;
  cursor: pointer;
  @media (max-width: 767px) {
    display: none;
  }
`

const MobileSignBtn = styled.button`
  border: 1px solid white;
  color: white;
  background-color: black;
  padding: 4px 8px;
  margin: 15px 0px 5px;
  cursor: pointer;
`
const navBarTxt: string[] = ['Pull', 'Issues', 'Marketplace', 'Explore']
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
function Header() {
  const [userPhoto, setUserPhoto] = useState('')
  const [searchBarStyle, setSearchBarStyle] = useState(false)
  const [listActive, setListActive] = useState(false)
  useEffect(() => {
    checkUser()
    window.addEventListener('hashchange', () => checkUser())
  }, [])
  async function checkUser() {
    const user = supabase.auth.user() as UserType
    if (user) {
      supabase.auth.session() as Session
      setUserPhoto(user.identities[0].identity_data.avatar_url)
    }
  }
  async function signInGithub() {
    await supabase.auth.signIn(
      {
        provider: 'github'
      },
      {
        scopes: 'repo gist notifications'
      }
    )
  }
  async function signOut() {
    await supabase.auth.signOut()
    setUserPhoto('')
  }
  return (
    <Wrapper>
      <NavBarWrapper>
        <HumbergerBtn
          onClick={() => {
            setListActive((prev) => !prev)
          }}
        >
          <HumbergerBtnSVG />
        </HumbergerBtn>

        <Icon />
        <SearchWrapper $isFocus={searchBarStyle}>
          <SearchBar
            $isFocus={searchBarStyle}
            onFocus={() => setSearchBarStyle(true)}
            onBlur={() => setSearchBarStyle(false)}
          />
          <SearchBarIcon>/</SearchBarIcon>
        </SearchWrapper>
        <Link>
          {navBarTxt.map((navTxt, index) => {
            if (index === 0) {
              return (
                <li key={index}>
                  <LinkBtn>
                    {navTxt}
                    <LinkText> request</LinkText>s
                  </LinkBtn>
                </li>
              )
            }
            return (
              <li key={index}>
                <LinkBtn>{navTxt}</LinkBtn>
              </li>
            )
          })}
        </Link>
        <MobileLink $isActive={listActive}>
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
        </MobileLink>
      </NavBarWrapper>
      <UserWrapper>
        <NotificationsBtn />
        <MoreActionButton>
          <MoreActionBtnIcon />
          <DropDown />
        </MoreActionButton>

        {userPhoto ? (
          <SignBtn onClick={() => signOut()}>signOut</SignBtn>
        ) : (
          <SignBtn onClick={() => signInGithub()}>signIn</SignBtn>
        )}
      </UserWrapper>
    </Wrapper>
  )
}

export default Header
