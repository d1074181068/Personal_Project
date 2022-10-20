import { KebabHorizontalIcon } from '@primer/octicons-react'
import { useState } from 'react'
import styled from 'styled-components'

//custom
import { OutSideWrapper } from '../../components/Common/Dropdown'

type PropsType = {
  btnTextList: string[]
  btnFn?: (() => void)[]
}

type MoreActionBtnType = {
  bgColor: string
  fillColor: string
}
type MoreActionWrapperPropsType = {
  display: string
}

const MobileMoreBtnWrapper = styled.div`
  position: relative;
  display: none;
  @media (max-width: 1011px) {
    display: block;
  }
`
const MobileActionBtnIcon = styled(KebabHorizontalIcon)``

const MobileMoreActionBtn = styled.button<MoreActionBtnType>`
  display: block;
  padding: 6px 12px;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.bgColor};
  & > ${MobileActionBtnIcon} {
    fill: ${(props) => props.fillColor};
  }
  :hover {
    background-color: #0969da;
    & > ${MobileActionBtnIcon} {
      fill: white;
    }
  }
`
const MobileActionBtnWrapper = styled.div<MoreActionWrapperPropsType>`
  position: absolute;
  top: 35px;
  right: 20px;
  z-index: 199;
  background-color: white;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
  width: 158px;
  display: ${(props) => props.display};
`
const MobileActionBtn = styled.a`
  padding: 10px;
  display: block;
  :hover {
    background-color: #0969da;
    color: white;
  }
  :first-child {
    border-radius: 6px 6px 0px 0px;
  }
  :last-child {
    border-radius: 0px 0px 6px 6px;
  }
`
function MobileAction({ btnTextList, btnFn }: PropsType) {
  const [moreActionBtnActive, setMoreActionBtnActive] = useState(false)
  return (
    <MobileMoreBtnWrapper>
      <MobileMoreActionBtn
        onClick={() => setMoreActionBtnActive((prev) => !prev)}
        bgColor={moreActionBtnActive ? '#0969da' : 'white'}
        fillColor={moreActionBtnActive ? 'white' : 'black'}>
        <MobileActionBtnIcon />
      </MobileMoreActionBtn>
      <MobileActionBtnWrapper display={moreActionBtnActive ? 'block' : 'none'}>
        {btnTextList.map((item, index) => {
          if (btnFn && btnFn[index]) {
            return (
              <MobileActionBtn
                key={index}
                onClick={() => {
                  btnFn[index]()
                  setMoreActionBtnActive(false)
                }}>
                {item}
              </MobileActionBtn>
            )
          }
          return <MobileActionBtn key={index}>{item}</MobileActionBtn>
        })}
      </MobileActionBtnWrapper>
      <OutSideWrapper
        open={moreActionBtnActive ? 'block' : 'none'}
        onClick={() => setMoreActionBtnActive(false)}
      />
    </MobileMoreBtnWrapper>
  )
}

export default MobileAction
