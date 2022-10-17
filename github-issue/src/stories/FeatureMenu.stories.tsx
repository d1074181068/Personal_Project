import React from 'react'
import { Meta, Story } from '@storybook/react'
import FeatureMenu from '../pages/NewIssue/FeatureMenu'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '../index.css'
import '../../.storybook/globalstyle.css'
import { MenuContentType } from '../pages/IssueList/PopupMenu'

type StorybookType = {
  title: string
  type: string
  organizeDataFn: () => void
  menuContent: MenuContentType
  menuPos: string
  updateOrigin: boolean
  checked?: boolean
}

export default {
  title: 'Example/newissue/FeatureMenu',
  component: FeatureMenu,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story<StorybookType> = (args: StorybookType) => (
  <Provider store={store}>
    <div style={{ margin: '20px' }}>
      <FeatureMenu {...args} />
    </div>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Labels',
  type: 'Labels',
  updateOrigin: false,
  organizeDataFn: () => {},
  menuPos: 'md:left-0',
  menuContent: {
    title: 'Assign up to 10 people to this',
    inputPlaceholder: 'Filter labels',
    content: [
      { icon: '#e99695', text: 'Chloe', desc: 'Chloe is coming' },
      { icon: '#47F827', text: 'Claire', desc: '' },
      { icon: '#008672', text: 'Elaine', desc: 'Elaine is coming' },
      { icon: '#6042B9', text: 'Emil', desc: 'Emil is coming' },
      { icon: '#FF0000', text: 'Frank', desc: 'Frank is coming' },
      { icon: '#59D663', text: 'Frank🐢', desc: 'vim中注定 (sprint5)' },
      { icon: '#d876e3', text: 'Hane', desc: 'Hane is coming' },
      { icon: '#fbca04', text: 'Hippo', desc: 'Hippo is coming' },
      { icon: '#461787', text: 'Jay', desc: 'Jay is coming' },
      { icon: '#e4e669', text: 'Kay', desc: 'Kay is coming' },
      { icon: '#359D98', text: 'Kelly', desc: 'Kelly is coming' },
      { icon: '#9D4C05', text: 'Lydia', desc: 'Lydia is coming' },
      { icon: '#8A917E', text: '河馬大河馬🦛', desc: 'vim 中注定' }
    ]
  }
}
export const LabelChecked = Template.bind({})
LabelChecked.args = {
  title: 'Labels',
  type: 'Labels',
  updateOrigin: false,
  checked: true,
  organizeDataFn: () => {},
  menuPos: 'md:left-0',
  menuContent: {
    title: 'Assign up to 10 people to this',
    inputPlaceholder: 'Filter labels',
    content: [
      { icon: '#e99695', text: 'Chloe', desc: 'Chloe is coming' },
      { icon: '#47F827', text: 'Claire', desc: '' },
      { icon: '#008672', text: 'Elaine', desc: 'Elaine is coming' },
      { icon: '#6042B9', text: 'Emil', desc: 'Emil is coming' },
      { icon: '#FF0000', text: 'Frank', desc: 'Frank is coming' },
      { icon: '#59D663', text: 'Frank🐢', desc: 'vim中注定 (sprint5)' },
      { icon: '#d876e3', text: 'Hane', desc: 'Hane is coming' },
      { icon: '#fbca04', text: 'Hippo', desc: 'Hippo is coming' },
      { icon: '#461787', text: 'Jay', desc: 'Jay is coming' },
      { icon: '#e4e669', text: 'Kay', desc: 'Kay is coming' },
      { icon: '#359D98', text: 'Kelly', desc: 'Kelly is coming' },
      { icon: '#9D4C05', text: 'Lydia', desc: 'Lydia is coming' },
      { icon: '#8A917E', text: '河馬大河馬🦛', desc: 'vim 中注定' }
    ]
  }
}
