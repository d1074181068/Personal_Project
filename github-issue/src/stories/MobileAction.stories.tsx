import React from 'react'
import { Meta, Story } from '@storybook/react'
import MobileAction from '../pages/Label/MobileAction'

type StorybookType = {
  btnTextList: string[]
}

export default {
  title: 'Example/page_label_management/MobileAction',
  component: MobileAction,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <div
    style={{
      margin: '20px',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
    Let your screen less than 1011px to show Button
    <MobileAction {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  btnTextList: ['Frank', 'JJ', 'Albert']
}
