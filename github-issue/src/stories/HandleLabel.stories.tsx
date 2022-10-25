import { Meta, Story } from '@storybook/react'
import '../../.storybook/globalstyle.css'
import HandleLabel from '../pages/Label/HandleLabel'

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
  labelData: string[]
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
  <div style={{ margin: '20px', border: '1px solid #CCC' }}>
    <HandleLabel {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  initLabelText: 'Frank',
  initLabelColorCode: '#FF0000',
  initDesctext: 'hello',
  moreBtnTextList: ['Delete'],
  labelData: [''],
  mainTitle: 'Label name',
  mainPlaceholder: 'Label name',
  subTitle: 'Description',
  subPlaceholder: 'Description (optional)',
  confirmButtonText: 'Create label',
  undoButtonText: 'Cancel',
  cancelClickFn: () => {}
}
