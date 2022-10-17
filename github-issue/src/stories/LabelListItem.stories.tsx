import React from 'react'
import { Meta, Story } from '@storybook/react'
import LabelListItem from '../pages/Label/LabelListItem'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
type StorybookType = {
  labelName: string
  labelDesc: string
  useLabelIssueQty: number
  colorCode: string
  labelData: string[]
}

export default {
  title: 'Example/page_label_management/LabelListItem',
  component: LabelListItem,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <Provider store={store}>
    <ul
      style={{
        margin: '20px',
        padding: '0px',
        listStyle: 'none'
      }}>
      <LabelListItem {...args} />
    </ul>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {
  labelName: 'Frank',
  labelData: [''],
  labelDesc: 'Frank is coming',
  useLabelIssueQty: 2,
  colorCode: '#FF0000'
}
