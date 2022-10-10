import React from 'react'
import { Meta, Story } from '@storybook/react'
import UserControlIssue from '../pages/NewIssue/UserControlIssue'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '../index.css'
import '../../.storybook/globalstyle.css'

type StorybookType = {
  titleInputPlaceholder: string
}

export default {
  title: 'Example/newissue/UserControlIssue',
  component: UserControlIssue,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <Provider store={store}>
    <div style={{ margin: '20px' }}>
      <UserControlIssue {...args} />
    </div>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {
  titleInputPlaceholder: 'Title'
}
