import React from 'react'
import { Meta, Story } from '@storybook/react'
import LabelItem from './LabelItem'

type StorybookType = {
  labelName: string
  colorCode: string
  textColor: string
}

export default {
  title: 'Example/page_label_management/LabelItem',
  component: LabelItem,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <div style={{ margin: '20px' }}>
    <LabelItem {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  labelName: 'Frank',
  colorCode: '#FF0000',
  textColor: '#FFFFFF'
}
