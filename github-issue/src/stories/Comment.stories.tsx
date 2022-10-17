import React from 'react'
import { Meta, Story } from '@storybook/react'
import Comment from '../pages/Issue/Comment'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '../index.css'
import '../../.storybook/globalstyle.css'
import { PropsType } from '../pages/Issue/Comment'

export default {
  title: 'Example/issue/Comment',
  component: Comment,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<PropsType> = (args: PropsType) => (
  <Provider store={store}>
    <div style={{ margin: '20px' }}>
      <Comment {...args} />
    </div>
  </Provider>
)

export const IssueComment = Template.bind({})
IssueComment.args = {
  id: 1410032101,
  body: 'sdvdsv',
  user: 'd1074181068',
  createTime: '2022-10-15T03:52:39Z',
  authorAssociation: 'OWNER',
  reactions: {
    '+1': 0,
    '-1': 0,
    confused: 0,
    eyes: 0,
    heart: 0,
    hooray: 0,
    laugh: 0,
    rocket: 0,
    total_count: 0,
    url: 'https://api.github.com/repos/d1074181068/webdesign/issues/70/reactions'
  },
  type: 'issueComment'
}

export const UserComment = Template.bind({})
UserComment.args = {
  id: 1410032101,
  body: 'sdvdsv',
  user: 'd1074181068',
  createTime: '2022-10-15T03:52:39Z',
  authorAssociation: 'AUTHOR',
  reactions: {
    '+1': 0,
    '-1': 0,
    confused: 0,
    eyes: 0,
    heart: 0,
    hooray: 0,
    laugh: 0,
    rocket: 0,
    total_count: 0,
    url: 'https://api.github.com/repos/d1074181068/webdesign/issues/70/reactions'
  },
  type: 'comment'
}
