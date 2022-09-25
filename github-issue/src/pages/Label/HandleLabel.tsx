//Libraries
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { SyncIcon } from '@primer/octicons-react'

//components
import GithubBtn from '../../components/Content/GithubBtn'
import LabelItem from './LabelItem'
import MobileAction from './MobileAction'
import ActionBtn from './ActionBtn'
import { OutSideWrapper } from '../../components/Content/Dropdown'

type PropsType = {
  initLabelText: string
  initLabelColorCode?: string
  moreBtnTextList?: string[]
  mainTitle: string
  subTitle: string
  confirmButtonText: string
  undoButtonText: string
  mainPlaceholder: string
  subPlaceholder: string
  cancelClickFn?: () => void
  createlabelFn?: (
    labelName: string,
    labelColor: string,
    labelDescription: string
  ) => void
  updatelabelFn?: (
    labelName: string,
    labelColor: string,
    labelDescription: string
  ) => void
}

type ColorBtnType = {
  colorCode: string
}
type FillColoeType = {
  fillColor: string
}
type ErrorColorType = {
  errorColorStatus: string
}
type ColorPickerPropsType = {
  $display: string
}

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 6px;
`
const UserControlWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0px 10px;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const ActionWrapper = styled.div`
  @media (max-width: 1011px) {
    display: none;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const MainInputWrapper = styled.div`
  width: 271px;
  margin-right: 20px;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 20px;
  }
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
  @media (max-width: 1011px) {
    width: 231px;
  }
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 20px;
  }
`
const SubInput = styled(MainInput)``

const ColorSelectWrapper = styled.div`
  width: 191px;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 20px;
  }
`
const RandomWrapper = styled.div`
  display: flex;
  position: relative;
`

const RandomColorBtn = styled.button<ColorBtnType>`
  width: 42px;
  height: 32px;
  background-color: ${(props) => props.colorCode};
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
`
const RandomColorBtnIcon = styled(SyncIcon)<FillColoeType>`
  fill: ${(props) => props.fillColor};
`

const RandomColorInput = styled.input<ErrorColorType>`
  width: 100%;
  height: 32px;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  background-color: rgb(245, 248, 250);
  padding-left: 15px;
  color: ${(props) => props.errorColorStatus};
`
const ColorPickerWrapper = styled.div<ColorPickerPropsType>`
  position: absolute;
  top: 35px;
  left: 41px;
  padding: 8px;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  background-color: white;
  z-index: 199;
  display: ${(props) => props.$display};
  &:after {
    border-right: solid 8px transparent;
    border-left: solid 8px transparent;
    border-bottom: solid 8px #ffffff;
    transform: translateX(-50%);
    position: absolute;
    outline: 1px red;
    z-index: 1;
    content: '';
    top: -8px;
    left: 25px;
    height: 0;
    width: 0;
  }

  &:before {
    border-right: solid 9px transparent;
    border-left: solid 9px transparent;
    border-bottom: solid 9px #e6eaee;
    transform: translateX(-50%);
    position: absolute;
    outline: 1px red;
    z-index: 1;
    content: '';
    top: -8.6px;
    left: 25px;
    height: 0;
    width: 0;
  }
`
const ColorPickerTitle = styled.h3`
  color: rgb(87, 96, 106);
  font-size: 12px;
  white-space: nowrap;
  margin-bottom: 10px;
`

const ColorPickerList = styled.ul`
  display: flex;
  width: 214px;
  margin-bottom: 5px;
  gap: 3px;
  :last-child {
    margin-bottom: 0;
  }
`
const ColorPickerBtn = styled.button<ColorBtnType>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: ${(props) => props.colorCode};
  border-color: ${(props) => props.colorCode};
  cursor: pointer;
`
const ControlBtnWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  @media (max-width: 767px) {
    flex-grow: unset;
    align-self: flex-start;
  }
`
const CreateLabelWrapper = styled.div`
  @media (max-width: 767px) {
    order: -1;
  }
`
const Space = styled.div`
  width: 10px;
  @media (max-width: 767px) {
    order: 1;
  }
`
const CancelCreateWrapper = styled.div`
  margin-left: 10px;
  @media (max-width: 767px) {
    order: 2;
    margin-left: 0px;
  }
`

export function randomHexColor() {
  let hex = Math.floor(Math.random() * 16777216).toString(16)
  while (hex.length < 6) {
    hex = '0' + hex
  }
  return '#' + hex.toUpperCase()
}

export function lightOrDark(bgcolor: string): string {
  const r = parseInt(bgcolor.slice(1, 3), 16)
  const g = parseInt(bgcolor.slice(3, 5), 16)
  const b = parseInt(bgcolor.slice(5, 7), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return 'error'
  }
  const hsp = r * 0.3 + g * 0.6 + b * 0.1
  if (hsp > 127.5) {
    return 'black'
  } else {
    return 'white'
  }
}

const commonColorPickerArr = [
  '#B60205',
  '#D93F0B',
  '#FBCA04',
  '#0E8A16',
  '#006B75',
  '#1D76DB',
  '#0052CC',
  '#5319E7'
]

const lightColorPickerArr = [
  '#E99695',
  '#F9D0C4',
  '#FEF2C0',
  '#C2E0C6',
  '#BFDADC',
  '#C5DEF5',
  '#BFD4F2',
  '#D4C5F9'
]

function HandleLabel({
  initLabelText,
  initLabelColorCode,
  moreBtnTextList,
  mainTitle,
  mainPlaceholder,
  subTitle,
  subPlaceholder,
  confirmButtonText,
  undoButtonText,
  cancelClickFn,
  createlabelFn,
  updatelabelFn
}: PropsType) {
  const [colorCode, setColorCode] = useState(
    initLabelColorCode || randomHexColor()
  )

  const [textColor, setTextcolor] = useState(
    initLabelColorCode
      ? lightOrDark(initLabelColorCode as string)
      : lightOrDark(colorCode)
  )
  const [labelText, setLabelText] = useState(initLabelText)
  const [errorColorCodeStatus, setErrorColorCodeStatus] = useState(false)
  const [inputEmptyStatus, setInputEmptyStatus] = useState(
    initLabelText ? false : true
  )
  const [colorPickerShow, setColorPickerShow] = useState(false)

  const currentColorCode = useRef<string>(colorCode)
  function checkAndSetColorCode(eventTarget: HTMLInputElement) {
    let inputValue = eventTarget.value
    let colorMode = ''
    if (inputValue.length > 7) {
      inputValue = inputValue.slice(0, 6)
      return
    }
    if (inputValue.length === 0) {
      setColorCode('#')
      return
    }
    if (inputValue.length === 4 || inputValue.length === 7) {
      setErrorColorCodeStatus(false)
      if (inputValue.length === 4) {
        inputValue = `#${inputValue.slice(1, 2)}${inputValue.slice(
          1,
          2
        )}${inputValue.slice(2, 3)}${inputValue.slice(2, 3)}${inputValue.slice(
          3,
          4
        )}${inputValue.slice(3, 4)}`
        colorMode = lightOrDark(inputValue)
      } else {
        colorMode = lightOrDark(inputValue)
      }
      if (colorMode === 'error') {
        setErrorColorCodeStatus(true)
        setColorCode(inputValue)
        return
      }
      currentColorCode.current = inputValue
    } else {
      setErrorColorCodeStatus(true)
    }
    setColorCode(eventTarget.value)
  }
  return (
    <Wrapper>
      <LabelWrapper>
        <LabelItem
          labelName={labelText === '' ? 'Label preview' : labelText}
          colorCode={currentColorCode.current}
          textColor={textColor}
        />
        {moreBtnTextList &&
          moreBtnTextList.map((item, index) => {
            return (
              <ActionWrapper key={index}>
                <ActionBtn btnText={item} />
              </ActionWrapper>
            )
          })}
        {moreBtnTextList && <MobileAction btnTextList={moreBtnTextList} />}
      </LabelWrapper>

      <UserControlWrapper>
        <MainInputWrapper>
          <Title>{mainTitle}</Title>
          <MainInput
            value={labelText}
            placeholder={mainPlaceholder}
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setInputEmptyStatus(true)
              } else {
                setInputEmptyStatus(false)
              }
              setLabelText(e.target.value)
            }}
          />
        </MainInputWrapper>
        <SubInputWrapper>
          <Title>{subTitle}</Title>
          <SubInput placeholder={subPlaceholder} />
        </SubInputWrapper>
        <ColorSelectWrapper>
          <Title>ColorCode</Title>
          <RandomWrapper>
            <RandomColorBtn
              colorCode={currentColorCode.current}
              onClick={() => {
                const colorCode = randomHexColor()
                const textColor = lightOrDark(colorCode)
                currentColorCode.current = colorCode
                setColorCode(colorCode)
                setTextcolor(textColor)
              }}
            >
              <RandomColorBtnIcon fillColor={textColor} />
            </RandomColorBtn>
            <RandomColorInput
              value={colorCode.toUpperCase()}
              errorColorStatus={errorColorCodeStatus ? 'red' : 'black'}
              onChange={(e) => {
                checkAndSetColorCode(e.target)
              }}
              onClick={() => setColorPickerShow(true)}
            />
            <ColorPickerWrapper $display={colorPickerShow ? 'block' : 'none'}>
              <ColorPickerTitle>Choose from default colors:</ColorPickerTitle>
              <ColorPickerList>
                {commonColorPickerArr.map((color, index) => {
                  return (
                    <li key={index}>
                      <ColorPickerBtn
                        colorCode={color}
                        onClick={() => {
                          setColorCode(color)
                          currentColorCode.current = color
                          setTextcolor(lightOrDark(color))
                          setColorPickerShow(false)
                          setErrorColorCodeStatus(false)
                        }}
                      />
                    </li>
                  )
                })}
              </ColorPickerList>
              <ColorPickerList>
                {lightColorPickerArr.map((color, index) => {
                  return (
                    <li key={index}>
                      <ColorPickerBtn
                        colorCode={color}
                        onClick={() => {
                          setColorCode(color)
                          currentColorCode.current = color
                          setTextcolor(lightOrDark(color))
                          setColorPickerShow(false)
                        }}
                      />
                    </li>
                  )
                })}
              </ColorPickerList>
            </ColorPickerWrapper>
            <OutSideWrapper
              open={colorPickerShow ? 'block' : 'none'}
              onClick={() => setColorPickerShow(false)}
            />
          </RandomWrapper>
        </ColorSelectWrapper>
        <ControlBtnWrapper>
          <CancelCreateWrapper>
            <GithubBtn
              bgcolor={'#ffffff'}
              $text={undoButtonText}
              textColor={'#000000'}
              hoverColor={'#f3f4f6'}
              border={'1px solid rgba(27,31,36,0.15)'}
              clickFn={
                cancelClickFn
                  ? () => {
                      setLabelText(initLabelText)
                      setColorCode(
                        (initLabelColorCode as string)
                          ? (initLabelColorCode as string)
                          : randomHexColor()
                      )
                      currentColorCode.current = initLabelColorCode
                        ? initLabelColorCode
                        : randomHexColor()
                      setErrorColorCodeStatus(false)
                      setInputEmptyStatus(initLabelText ? false : true)
                      cancelClickFn()
                    }
                  : () => {}
              }
            />
          </CancelCreateWrapper>
          <Space />
          <CreateLabelWrapper>
            <GithubBtn
              bgcolor={'#2DA44F'}
              $text={confirmButtonText}
              textColor={'#ffffff'}
              hoverColor={'#2c974b'}
              $disabled={inputEmptyStatus || errorColorCodeStatus}
              clickFn={
                createlabelFn
                  ? () => {
                      if (cancelClickFn) cancelClickFn()
                      setLabelText(initLabelText)
                      setColorCode(
                        (initLabelColorCode as string)
                          ? (initLabelColorCode as string)
                          : randomHexColor()
                      )
                      currentColorCode.current = initLabelColorCode
                        ? initLabelColorCode
                        : randomHexColor()
                      createlabelFn(labelText, colorCode.split('#')[1], '')
                    }
                  : updatelabelFn
                  ? () => {
                      if (cancelClickFn) cancelClickFn()
                      updatelabelFn(labelText, colorCode.split('#')[1], '')
                    }
                  : () => {}
              }
            />
          </CreateLabelWrapper>
        </ControlBtnWrapper>
      </UserControlWrapper>
    </Wrapper>
  )
}

export default HandleLabel
