import React from 'react'
import { Meta, Story } from '@storybook/react'
import PopMenu from '../pages/IssueList/PopupMenu'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { MenuContentType } from '../pages/IssueList/PopupMenu'
import '../index.css'
import '../../.storybook/globalstyle.css'

type StorybookType = {
  top?: string
  left?: string
  right?: string
  bottom?: string
  menuOpenStatus: boolean
  setMenuStatusFn: React.Dispatch<React.SetStateAction<boolean>>
  menuContent?: MenuContentType
}

export default {
  title: 'Example/issueList/PopMenu',
  component: PopMenu,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <Provider store={store}>
    <PopMenu {...args} />
  </Provider>
)

export const Default = Template.bind({})
Default.args = {
  menuOpenStatus: true,
  setMenuStatusFn: () => {},
  menuContent: {
    commonAction: 'Unlabeled',
    inputPlaceholder: 'Filter labels',
    title: 'Filter by label',
    type: 'labels',
    content: [
      {
        icon: '#d4c5f9',
        text: 'Frank',
        desc: 'Frank say hello'
      },
      {
        icon: '#d4c5f9',
        text: 'JJ',
        desc: ''
      },
      {
        icon: '#d4c5f9',
        text: 'okay',
        desc: ''
      }
    ]
  },
  top: 'top-[20px]',
  left: 'left-[50px]'
}
