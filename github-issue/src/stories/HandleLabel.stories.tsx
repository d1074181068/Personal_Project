import React from 'react'
import { Meta, Story } from '@storybook/react'
import HandleLabel from '../pages/Label/HandleLabel'
import '../../.storybook/globalstyle.css'

type StorybookType = {
  initLabelText: string
  initDesctext: string
  initLabelColorCode: string
  moreBtnTextList: string[]
  mainTitle: string
  mainPlaceholder: string
  subTitle: string
  subPlaceholder: string
  confirmButtonText: string
  undoButtonText: string
  cancelClickFn: () => void
}

export default {
  title: 'Example/page_label_management/HandleLabel',
  component: HandleLabel,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <div style={{ margin: '20px' }}>
    <HandleLabel {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  initLabelText: 'Frank',
  initLabelColorCode: '#FF0000',
  initDesctext: 'hello',
  moreBtnTextList: ['Delete'],
  mainTitle: 'Label name',
  mainPlaceholder: 'Label name',
  subTitle: 'Description',
  subPlaceholder: 'Description (optional)',
  confirmButtonText: 'Create label',
  undoButtonText: 'Cancel',
  cancelClickFn: () => {}
}
