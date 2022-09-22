import React from 'react'
import { Meta, Story } from '@storybook/react'
import ActionBtn from './ActionBtn'

type StorybookType = {
  btnText: string
}

export default {
  title: 'Example/page_label_management/ActionBtn',
  component: ActionBtn,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <div style={{ margin: '20px' }}>
    <ActionBtn {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  btnText: 'Edit'
}
