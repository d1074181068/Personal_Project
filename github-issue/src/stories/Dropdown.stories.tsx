import { Meta, Story } from '@storybook/react'
import Dropdown from '../components/Common/Dropdown'

type StorybookType = {
  text: string
  dropdownText: string[]
  top: string
  right: string
}

export default {
  title: 'Example/common_contents/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <div
    style={{
      margin: '20px'
    }}>
    <Dropdown {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  text: "I'm title",
  dropdownText: ['', 'test1', 'test2'],
  top: '20px',
  right: '0px'
}
