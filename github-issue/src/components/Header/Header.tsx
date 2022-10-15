//Libraries
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  MarkGithubIcon,
  BellIcon,
  PlusIcon,
  TriangleDownIcon,
  ThreeBarsIcon
} from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'

//components
import MobileLink from './MobileLink'

//custom
import { storeToken } from '../../redux/userSlice'
import { supabase } from '../../utils/client'
import { UserType, Session } from '../../types/supabaseType'
import { RootState } from '../../redux/store'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #24292f;
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
  :hover {
    fill: rgb(255, 255, 255, 0.7);
  }
  @media (max-width: 768px) {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`

const Logo = styled.div``
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
  max-width: 542px;
  @media (max-width: 767px) {
    display: none;
  }
`
type TypeFocus = { $isFocus: boolean }
const SearchBar = styled.input.attrs({
  placeholder: 'Search or jump to...'
})<TypeFocus>`
  position: relative;
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
  background-color: #24292f;
  padding: 4px 8px;
  cursor: pointer;
  @media (max-width: 767px) {
    display: none;
  }
`
const navBarTxt: string[] = ['Pull', 'Issues', 'Marketplace', 'Explore']
function Header() {
  const [searchBarStyle, setSearchBarStyle] = useState(false)
  const [listActive, setListActive] = useState(false)
  const { userReducer } = useSelector((store: RootState) => store)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    checkUser()
    window.addEventListener('hashchange', () => checkUser())
  }, [])
  async function checkUser() {
    const user = supabase.auth.user() as UserType

    if (user) {
      supabase.auth.session() as Session
      const userLoginObj = JSON.parse(
        localStorage.getItem('supabase.auth.token') as string
      )
      if (userLoginObj) {
        dispatch(storeToken(userLoginObj.currentSession.provider_token))
        localStorage.setItem(
          'userName',
          userLoginObj.currentSession.user.identities[0].identity_data
            .preferred_username
        )
      }
    }
  }
  async function signInGithub(): Promise<void> {
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
    localStorage.clear()
    dispatch(storeToken(''))
    navigate('/')
  }
  return (
    <>
      <Wrapper>
        <NavBarWrapper>
          <HumbergerBtn
            onClick={() => {
              setListActive((prev) => !prev)
            }}>
            <HumbergerBtnSVG />
          </HumbergerBtn>
          <Logo onClick={() => navigate('/')}>
            <Icon />
          </Logo>

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
        </NavBarWrapper>
        <UserWrapper>
          <NotificationsBtn />
          <MoreActionButton>
            <MoreActionBtnIcon />
            <DropDown />
          </MoreActionButton>

          {userReducer.token ? (
            <SignBtn onClick={() => signOut()}>signOut</SignBtn>
          ) : (
            <SignBtn onClick={() => signInGithub()}>signIn</SignBtn>
          )}
        </UserWrapper>
      </Wrapper>
      <MobileLink
        listActive={listActive}
        searchBarStyle={searchBarStyle}
        userToken={userReducer.token}
        setSearchBarStyle={setSearchBarStyle}
        signOut={signOut}
        signInGithub={signInGithub}
      />
    </>
  )
}

export default Header
