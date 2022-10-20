import { Meta, Story } from '@storybook/react'
import LabelItem from '../pages/Label/Label'

type StorybookType = {
  labelName: string
  colorCode: string
  textColor: string
}

export default {
  title: 'Example/page_label_management/LabelItem',
  component: LabelItem,
  parameters: {
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
