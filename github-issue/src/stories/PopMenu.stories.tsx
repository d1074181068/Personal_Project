import React from 'react'
import { Meta, Story } from '@storybook/react'
import PopMenu from '../pages/IssueList/PopupMenu'
import { Provider, useDispatch } from 'react-redux'
import { store } from '../redux/store'
import { MenuContentType } from '../pages/IssueList/PopupMenu'
import '../index.css'
import '../../.storybook/globalstyle.css'

type StorybookType = {
  checked: boolean
  top?: string
  left?: string
  right?: string
  bottom?: string
  withDismissButton: boolean
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

const Template: Story<StorybookType> = (args: StorybookType) => {
  return (
    <Provider store={store}>
      <PopMenu {...args} />
    </Provider>
  )
}

export const Default = Template.bind({})
Default.args = {
  menuOpenStatus: true,
  withDismissButton: true,
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

export const Checked = Template.bind({})
Checked.args = {
  menuOpenStatus: true,
  checked: true,
  withDismissButton: true,
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
