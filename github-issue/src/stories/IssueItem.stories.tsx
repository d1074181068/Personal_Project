import { Meta, Story } from '@storybook/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '../../.storybook/globalstyle.css'
import '../index.css'
import IssueItem from '../pages/IssueList/IssueItem'
import { store } from '../redux/store'

type StorybookType = {
  title: string
  body: string
  labels: { name: string; bgColor: string; id: number; desc: string }[]
  number: number
  assignees: {
    userImage: string
    userName: string
  }[]
  commentsQty: number
  createBy: string
  createTime: string
  stateReason: null
  state: string
  ownerImg: string
}

export default {
  title: 'Example/issueList/IssueItem',
  component: IssueItem,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <Provider store={store}>
    <BrowserRouter>
      <div
        style={{
          margin: '50px',
          borderTop: '1px solid rgb(208 ,215 ,222)',
          borderRadius: '6px'
        }}>
        <IssueItem {...args} />
      </div>
    </BrowserRouter>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {
  title: 'issue#12',
  labels: [{ name: 'Frank', bgColor: 'FF0000', id: 123, desc: 'hello' }],
  number: 2,
  body: 'hello',
  assignees: [
    {
      userImage: 'https://avatars.githubusercontent.com/u/71813522?v=4',
      userName: 'd1074181068'
    },
    {
      userImage: 'https://avatars.githubusercontent.com/u/98696228?v=4',
      userName: 'JJ'
    },
    {
      userImage: 'https://avatars.githubusercontent.com/u/109965534?v=4',
      userName: 'Hippo'
    }
  ],
  commentsQty: 5,
  createBy: 'd1074180168',
  createTime: '2022-10-01T07:43:38Z',
  stateReason: null,
  state: 'open',
  ownerImg: 'https://avatars.githubusercontent.com/u/71813522?v=4'
}
