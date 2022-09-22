import React from 'react'
import { Meta, Story } from '@storybook/react'
import GithubBtn from './GithubBtn'

type StorybookType = {
  bgcolor: string
  $text: string
  textColor: string
  border: string
}

export default {
  title: 'Example/common_contents/GithubBtn',
  component: GithubBtn,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <div style={{ margin: '20px' }}>
    <GithubBtn {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  bgcolor: 'rgb(46,164,78)',
  textColor: 'white',
  $text: 'New Label',
  border: '1px solid #2ea44e'
}
