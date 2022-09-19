//Libraries
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  MarkGithubIcon,
  BellIcon,
  PlusIcon,
  TriangleDownIcon
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
  padding: 16px 32px;
`
const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Icon = styled(MarkGithubIcon)`
  width: 32px;
  height: 32px;
  margin-right: 16px;
  :hover {
    fill: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }
`
const SearchBar = styled.input.attrs({ placeholder: 'Search or jump to...' })`
  position: relative;
  background-color: black;
  width: 272px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  height: 30px;
  padding: 0px 12px;
  font-size: 14px;
  margin-right: 16px;
  ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  :focus-visible {
    outline: 0;
  }
`
const SearchBarIcon = styled.span`
  display: block;
  position: absolute;
  color: rgba(255, 255, 255, 0.4);
  left: 325px;
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
`
const LinkBtn = styled.a`
  margin-right: 16px;
  color: white;
  font-weight: bold;
  :hover {
    color: rgba(255, 255, 255, 0.7);
  }
`
const UserWrapper = styled.div``
const NotificationsBtn = styled(BellIcon)`
  margin-right: 16px;
  cursor: pointer;
  :hover {
    fill: rgba(255, 255, 255, 0.7);
  }
`

const MoreActionBtnIcon = styled(PlusIcon)``
const DropDown = styled(TriangleDownIcon)``
const MoreActionButton = styled.a`
  margin-right: 16px;
  :hover {
    & > ${MoreActionBtnIcon}, & > ${DropDown} {
      fill: rgba(255, 255, 255, 0.7);
    }
  }
`

const SignBtn = styled.button`
  border: 1px solid white;
  color: white;
  background-color: black;
  padding: 8px 12px;
  cursor: pointer;
`
const navBarTxt: string[] = [
  'Pull requests',
  'Issues',
  'Marketplace',
  'Explore'
]

function Header() {
  const [userPhoto, setUserPhoto] = useState('')

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
        <Icon />
        <SearchBar />
        <SearchBarIcon>/</SearchBarIcon>
        <Link>
          {navBarTxt.map((navTxt, index) => {
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

        {userPhoto ? (
          <SignBtn onClick={() => signOut()}>signOut</SignBtn>
        ) : (
          <SignBtn onClick={() => signInGithub()}>login</SignBtn>
        )}
      </UserWrapper>
    </Wrapper>
  )
}

export default Header
