import React from 'react'
import { Meta, Story } from '@storybook/react'
import MobileAction from './MobileAction'

type StorybookType = {
  btnTextList: string[]
}

export default {
  title: 'Example/page_label_management/MobileAction',
  component: MobileAction,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <div
    style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}
  >
    Let your screen less than 1011px to show Button
    <MobileAction {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  btnTextList: ['Frank', 'JJ', 'Albert']
}
