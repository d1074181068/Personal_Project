import React from 'react'
import { Meta, Story } from '@storybook/react'
import Dropdown from './Dropdown'

type StorybookType = {
  text: string
  dropdownText: string[]
}

export default {
  title: 'Example/common_contents/Dropdown',
  component: Dropdown,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <div
    style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}
  >
    the component is in the upper right , click it to open dropdown
    <Dropdown {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  text: "I'm title",
  dropdownText: ['', 'test1', 'test2']
}
