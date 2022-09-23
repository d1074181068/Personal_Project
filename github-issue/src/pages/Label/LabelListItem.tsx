//Libraries
import React, { useState } from 'react'
import styled from 'styled-components'
//custom
import { lightOrDark } from './HandleLabel'
//components
import LabelItem from './LabelItem'
import HandleLabel from './HandleLabel'
import ActionBtn from './ActionBtn'
import MobileAction from './MobileAction'

type PropsType = {
  labelName: string
  labelDesc: string
  useLabelIssueQty: number
  colorCode: string
}

type Display = {
  display: string
}
const Item = styled.li`
  border-bottom: 1px solid rgb(208, 215, 222);
  :last-child {
    border-bottom: none;
  }
`
const LabelWrapper = styled.div<Display>`
  display: ${(props) => props.display};
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px 0px 20px 20px;
`
const FixedRapper = styled.div`
  width: 25%;
  :nth-child(4) {
    display: flex;
    justify-content: flex-end;
  }
`
const LabelDesc = styled.span`
  color: rgb(87, 96, 106);
  font-size: 12px;
  @media (max-width: 767px) {
    display: none;
  }
`
const LabelUserStatus = styled.a`
  color: rgb(87, 96, 106);
  font-size: 12px;
  :hover {
    color: #0969da;
    text-decoration: underline;
  }
  @media (max-width: 767px) {
    display: none;
  }
`

const ActionBtnWrapper = styled.div`
  display: flex;
  @media (max-width: 1011px) {
    display: none;
  }
`
const MarginWrapper = styled.div`
  margin-right: 20px;
`

const MobileBtnWrapper = styled.div`
  margin-right: 20px;
  display: none;
  @media (max-width: 1011px) {
    display: block;
  }
`

const HandleLabelWrapper = styled.div<Display>`
  display: ${(props) => props.display};
`

function LabelListItem({
  labelName,
  labelDesc,
  useLabelIssueQty,
  colorCode
}: PropsType) {
  const [areaOfEditLabel, setAreaOfEditLabel] = useState(false)
  const textColor = lightOrDark(colorCode)

  return (
    <>
      <Item>
        <LabelWrapper display={areaOfEditLabel ? 'none' : 'flex'}>
          <FixedRapper>
            <LabelItem
              labelName={labelName}
              colorCode={colorCode}
              textColor={textColor}
            />
          </FixedRapper>
          <FixedRapper>
            <LabelDesc>{labelDesc}</LabelDesc>
          </FixedRapper>
          <FixedRapper>
            <LabelUserStatus>
              {useLabelIssueQty} open issue or pull request
            </LabelUserStatus>
          </FixedRapper>
          <FixedRapper>
            <ActionBtnWrapper>
              <MarginWrapper>
                <ActionBtn
                  btnText={'Edit'}
                  clickFn={() => setAreaOfEditLabel((prev) => !prev)}
                />
              </MarginWrapper>
              <MarginWrapper>
                <ActionBtn btnText={'Delete'} />
              </MarginWrapper>
            </ActionBtnWrapper>
            <MobileBtnWrapper>
              <MobileAction
                btnTextList={['Edit', 'Delete']}
                btnFn={[() => setAreaOfEditLabel((prev) => !prev)]}
              />
            </MobileBtnWrapper>
          </FixedRapper>
        </LabelWrapper>
        <HandleLabelWrapper display={areaOfEditLabel ? 'block' : 'none'}>
          <HandleLabel
            initLabelText={labelName}
            initLabelColorCode={colorCode}
            moreBtnTextList={['Delete']}
            mainTitle={'Label name'}
            mainPlaceholder={'Label name'}
            subTitle={'Description'}
            subPlaceholder={'Description (optional)'}
            confirmButtonText={'Save Change'}
            undoButtonText={'Cancel'}
            cancelClickFn={() => setAreaOfEditLabel(false)}
          />
        </HandleLabelWrapper>
      </Item>
    </>
  )
}

export default LabelListItem
