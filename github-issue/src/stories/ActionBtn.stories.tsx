import React from 'react'
import { Meta, Story } from '@storybook/react'
import ActionBtn from '../pages/Label/ActionBtn'

type StorybookType = {
  btnText: string
}

export default {
  title: 'Example/page_label_management/ActionBtn',
  component: ActionBtn,
  parameters: {
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
