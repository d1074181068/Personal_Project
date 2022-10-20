import React from 'react'
import styled from 'styled-components'
import { MarkGithubIcon } from '@primer/octicons-react'

const Wrapper = styled.footer`
  padding: 0px 40px;
`
const LinkWrapper = styled.div`
  max-width: 1280px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 40px 16px 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  @media (max-width: 1011px) {
    flex-direction: column;
  }
`
const LinkList = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  @media (max-width: 1011px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`
const LinkBtn = styled.a`
  display: block;
  text-decoration: none;
  color: rgb(9, 105, 218);
  font-size: 12px;
  @media (max-width: 1011px) {
    margin-right: 20px;
    margin-bottom: 10px;
  }
`
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #57606a;
  font-size: 12px;
  margin-right: 10px;
  @media (max-width: 1011px) {
    margin-top: 15px;
    margin-right: 0;
    order: 1;
  }
`
const Logo = styled(MarkGithubIcon)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  fill: rgb(110, 119, 129);
`

const footerText = [
  'Terms',
  'Privacy',
  'Security',
  'Status',
  'Docs',
  'Contact GitHub',
  'Pricing',
  'API',
  'Training',
  'Blog',
  'About'
]
function Footer() {
  return (
    <Wrapper>
      <LinkWrapper>
        <LogoWrapper>
          <Logo />
          &copy; 2022 GitHub, Inc.
        </LogoWrapper>
        <LinkList>
          {footerText.map((text, index) => {
            return (
              <li key={index}>
                <LinkBtn>{text}</LinkBtn>
              </li>
            )
          })}
        </LinkList>
      </LinkWrapper>
    </Wrapper>
  )
}

export default Footer
