//Libraries
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
//custom
import { lightOrDark } from './HandleLabel'
import {
  useUpdateLabelMutation,
  useDeleteLabelMutation
} from '../../redux/labelApiSlice'
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
  const [updateLabel] = useUpdateLabelMutation()
  const [deleteLabel] = useDeleteLabelMutation()
  const userToken = localStorage.getItem('userToken') as string
  const tagName = useRef('')
  tagName.current = labelName
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
                <ActionBtn
                  btnText={'Delete'}
                  clickFn={() => {
                    deleteLabel({
                      name: 'd1074181068',
                      repo: 'webdesign',
                      labelName: tagName.current,
                      token: userToken
                    })
                  }}
                />
              </MarginWrapper>
            </ActionBtnWrapper>
            <MobileBtnWrapper>
              <MobileAction
                btnTextList={['Edit', 'Delete']}
                btnFn={[
                  () => setAreaOfEditLabel((prev) => !prev),
                  () => {
                    deleteLabel({
                      name: 'd1074181068',
                      repo: 'webdesign',
                      labelName: tagName.current,
                      token: userToken
                    })
                  }
                ]}
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
            updatelabelFn={(
              labelName: string,
              labelColor: string,
              labelDescription: string
            ) => {
              updateLabel({
                name: 'd1074181068',
                repo: 'webdesign',
                labelName: tagName.current,
                token: userToken,
                body: {
                  name: labelName,
                  color: labelColor,
                  description: labelDescription
                }
              })
            }}
          />
        </HandleLabelWrapper>
      </Item>
    </>
  )
}

export default LabelListItem
