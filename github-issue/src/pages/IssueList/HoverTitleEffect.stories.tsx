import React from 'react'
import { Meta, Story } from '@storybook/react'
import HoverTitleEffect from './HoverTitleEffect'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import '../../index.css'
import '../../../.storybook/globalstyle.css'

type StorybookType = {
  title: string
  body: string
  labels: { name: string; bgColor: string; desc: string; id: number }[]
  number: number
  createTime: string
  stateReason: string | null
  ownerImg: string
}

export default {
  title: 'Example/issueList/HoverTitleEffect',
  component: HoverTitleEffect,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <Provider store={store}>
    <div className='relative' style={{ marginTop: '30%' }}>
      <HoverTitleEffect {...args} />
    </div>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Frank 在寫扣',
  body: '寫扣寫起來',
  labels: [
    { name: 'Frank', bgColor: '#FF0000', desc: 'Frank is coming', id: 123 }
  ],
  number: 5,
  createTime: '2022-09-18T02:13:40Z',
  stateReason: null,
  ownerImg: 'https://avatars.githubusercontent.com/u/71813522?v=4'
}
