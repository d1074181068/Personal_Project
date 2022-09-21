//Libraries
import React, { useState } from 'react'
import styled from 'styled-components'
import { SyncIcon } from '@primer/octicons-react'

//components
import GithubBtn from '../../components/Content/GithubBtn'
import LabelItem from './LabelItem'

type PropsType = {
  mainTitle: string
  subTitle: string
  confirmButtonText: string
  undoButtonText: string
  mainPlaceholder: string
  subPlaceholder: string
  cancelClickFn?: () => void
}

type ColorBtnType = {
  colorCode: string
}

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid rgb(208, 215, 222);
`
const UserControlWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0px 10px;
`
const MainInputWrapper = styled.div`
  width: 271px;
  margin-right: 20px;
`
const Title = styled.label`
  font-weight: 500;
  margin-bottom: 10px;
  display: block;
`
const MainInput = styled.input`
  width: 100%;
  height: 32px;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  background-color: rgb(245, 248, 250);
  padding-left: 15px;
`
const SubInputWrapper = styled.div`
  width: 367px;
  margin-right: 15px;
`
const SubInput = styled(MainInput)``

const ColorSelectWrapper = styled.div`
  width: 191px;
`
const RandomWrapper = styled.div`
  display: flex;
`

const RandomColorBtn = styled.button<ColorBtnType>`
  width: 42px;
  height: 32px;
  background-color: ${(props) => props.colorCode};
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
`
const RandomColorInput = styled.input`
  width: 100%;
  height: 32px;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  background-color: rgb(245, 248, 250);
  padding-left: 15px;
`
const ControlBtnWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
`
const Space = styled.div`
  width: 10px;
`

function randomHexColor() {
  let hex = Math.floor(Math.random() * 16777216).toString(16)
  while (hex.length < 6) {
    hex = '0' + hex
  }
  return '#' + hex
}

function HandleLabel({
  mainTitle,
  mainPlaceholder,
  subTitle,
  subPlaceholder,
  confirmButtonText,
  undoButtonText,
  cancelClickFn
}: PropsType) {
  const [colorCode, setColorCode] = useState(randomHexColor())
  const [labelText, setLabelText] = useState('Label preview')
  return (
    <Wrapper>
      <LabelItem
        labelName={labelText === '' ? 'Label preview' : labelText}
        colorCode={colorCode}
      />
      <UserControlWrapper>
        <MainInputWrapper>
          <Title>{mainTitle}</Title>
          <MainInput
            placeholder={mainPlaceholder}
            onChange={(e) => setLabelText(e.target.value)}
          />
        </MainInputWrapper>
        <SubInputWrapper>
          <Title>{subTitle}</Title>
          <SubInput placeholder={subPlaceholder} />
        </SubInputWrapper>
        <ColorSelectWrapper>
          <Title>ColorCode (without "#")</Title>
          <RandomWrapper>
            <RandomColorBtn
              colorCode={colorCode}
              onClick={() => {
                const colorCode = randomHexColor()
                setColorCode(colorCode)
              }}
            >
              <SyncIcon />
            </RandomColorBtn>
            <RandomColorInput
              value={colorCode}
              onChange={(e) => {
                if (e.target.value.length > 7) {
                  e.target.value = e.target.value.slice(0, 6)
                  return
                } else if (e.target.value.length === 0) {
                  setColorCode(randomHexColor())
                  return
                }
                setColorCode(e.target.value)
              }}
            />
          </RandomWrapper>
        </ColorSelectWrapper>
        <ControlBtnWrapper>
          <GithubBtn
            bgcolor={'#ffffff'}
            $text={undoButtonText}
            textColor={'#000000'}
            border={'1px solid rgba(27,31,36,0.15)'}
            clickFn={cancelClickFn ? cancelClickFn : () => {}}
          />
          <Space />
          <GithubBtn
            bgcolor={'#2DA44F'}
            $text={confirmButtonText}
            textColor={'#ffffff'}
          />
        </ControlBtnWrapper>
      </UserControlWrapper>
    </Wrapper>
  )
}

export default HandleLabel
