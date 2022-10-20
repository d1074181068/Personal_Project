//Libraries
import { SearchIcon } from '@primer/octicons-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
//components
import Dropdown from '../../components/Common/Dropdown'
import GithubBtn from '../../components/Common/GithubBtn'
import HandleLabel from './HandleLabel'
import LabelListItem from './LabelListItem'
import SubNavButton from './SubNavButtonWrapper'
//custom
import Loading from '../../components/Common/Loading'
import {
  useCreateLabelMutation,
  useGetLabelQuery
} from '../../redux/labelApiSlice'
import { RootState } from '../../redux/store'

type LabelControlerType = {
  display: string
}

const Wrapper = styled.main`
  padding: 24px 32px 142px;
`
const Navbar = styled.div`
  display: flex;
  align-items: center;
  max-width: 1216px;
  margin: 0 auto;
  flex-wrap: wrap;
`

const SearchBarWrapper = styled.div`
  position: relative;
  margin-left: 10px;
  @media (max-width: 681px) {
    order: 1;
    margin-left: 0;
    margin-top: 20px;
  }
`
const SearchBar = styled.input.attrs({ placeholder: 'Search all labels' })`
  width: 320px;
  height: 32px;
  border: 1px solid rgb(208, 215, 222);
  background-color: rgb(246, 248, 250);
  border-radius: 6px;
  padding-left: 30px;
`

const SearchBarIcon = styled(SearchIcon)`
  position: absolute;
  left: 8px;
  top: 8px;
  fill: rgb(87, 96, 106);
`

const NewLabelBtnWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`
const LabelListWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid rgb(208, 215, 222);
  max-width: 1216px;
  margin: 20px auto;
`
const LabelListHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(246, 248, 250);
  border-bottom: 1px solid rgb(208, 215, 222);
`
const LabelQuantity = styled.h3`
  font-weight: 500;
`

const ListContentWrapper = styled.ul``

const CreateLabelWrapper = styled.div<LabelControlerType>`
  display: ${(props) => props.display};
  max-width: 1216px;
  margin: 20px auto 0px;
  background-color: rgb(245, 248, 250);
  border: 1px solid rgb(208, 215, 222);
  border-radius: 6px;
`
export const NotLogin = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 30px;
`

function LabelList() {
  const repo = sessionStorage.getItem('repo')
  const userName = localStorage.getItem('userName')
  const navigate = useNavigate()
  const { userReducer } = useSelector((store: RootState) => store)
  const [handleLabelOpen, setHandleLabelOpen] = useState(false)
  const [createLabel] = useCreateLabelMutation()
  const { data, isLoading, isError } = useGetLabelQuery({
    name: userName ? userName : '',
    repo: repo ? repo : ''
  })
  if (!userReducer.token) return <NotLogin>你尚未登入</NotLogin>
  if (isError) {
    if (!repo) {
      alert('你尚未選擇repo,即將跳轉頁面')
      navigate('/')
      return <>error</>
    } else {
      return <>Error</>
    }
  }
  if (isLoading) {
    return <Loading />
  }
  const labelData = data?.map(({ name }: { name: string }) => name)
  return (
    <Wrapper>
      <Navbar>
        <SubNavButton />
        <SearchBarWrapper>
          <SearchBar />
          <SearchBarIcon />
        </SearchBarWrapper>
        <NewLabelBtnWrapper>
          <GithubBtn
            bgcolor={'rgb(46,164,78)'}
            hoverColor={'#2c974b'}
            textColor={'white'}
            $text={'New Label'}
            clickFn={() => {
              setHandleLabelOpen((prev) => !prev)
            }}
          />
        </NewLabelBtnWrapper>
      </Navbar>
      <CreateLabelWrapper display={handleLabelOpen ? 'block' : 'none'}>
        <HandleLabel
          initLabelText={''}
          initDesctext={''}
          labelData={labelData || ['']}
          mainTitle={'Label name'}
          mainPlaceholder={'Label name'}
          subTitle={'Description'}
          subPlaceholder={'Description (optional)'}
          confirmButtonText={'Create label'}
          undoButtonText={'Cancel'}
          cancelClickFn={() => setHandleLabelOpen(false)}
          createlabelFn={(
            labelName: string,
            labelColor: string,
            labelDescription: string
          ) =>
            createLabel({
              name: userName ? userName : '',
              repo: repo ? repo : '',
              body: {
                name: labelName,
                color: labelColor,
                description: labelDescription
              }
            })
          }
        />
      </CreateLabelWrapper>

      <LabelListWrapper>
        <LabelListHeader>
          <LabelQuantity>{data && data.length} labels</LabelQuantity>
          <Dropdown
            text={'Sort'}
            dropdownText={[
              '',
              'Alphabetically',
              'Reverse alphabetically',
              'Most issues',
              'Fewest issues'
            ]}
            top={'20px'}
            right={'0px'}
          />
        </LabelListHeader>
        <ListContentWrapper>
          {data &&
            data.map(({ name, description, color }, index) => {
              return (
                <LabelListItem
                  labelName={name}
                  labelData={labelData || ['']}
                  labelDesc={description ? description : ''}
                  useLabelIssueQty={2}
                  colorCode={`#${color}`}
                  key={`${name}-${color}-${index}`}
                />
              )
            })}
        </ListContentWrapper>
      </LabelListWrapper>
    </Wrapper>
  )
}

export default LabelList
