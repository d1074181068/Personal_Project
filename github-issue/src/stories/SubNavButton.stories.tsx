import React from 'react'
import { Meta, Story } from '@storybook/react'
import SubNavButton from '../pages/Label/SubNavButtonWrapper'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '../../index.css'
import '../../../.storybook/globalstyle.css'

type StorybookType = {}

export default {
  title: 'Example/issueList/SubNavButton',
  component: SubNavButton,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <Provider store={store}>
    <div style={{ margin: '20px' }}>
      <SubNavButton {...args} />
    </div>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {}
