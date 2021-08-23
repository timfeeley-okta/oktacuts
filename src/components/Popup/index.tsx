import * as React from 'react'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation'
import { StyledLink as Link } from 'baseui/link'
import { Button, KIND, SIZE } from 'baseui/button'

import SyncSheet from '../Sync'
import AddModal from '../Editor/add'
import Editor from '../Editor'
import { useAppDispatch } from '@/state/index'
import { setUI } from '@/state/ui'

const Popup: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div style={{ width: '500px', height: '600px' }}>
      <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>Oktacuts</NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center} />
        <NavigationList $align={ALIGN.right}>
          <NavigationItem>
            <Button
              kind={KIND.secondary}
              size={SIZE.compact}
              onClick={() => {
                dispatch(setUI({ uiElement: 'syncSheet', value: true }))
              }}>
              Okta Sync
            </Button>
          </NavigationItem>
          <NavigationItem>
            <Button
              kind={KIND.primary}
              size={SIZE.compact}
              onClick={() => {
                dispatch(setUI({ uiElement: 'addModal', value: true }))
              }}>
              Add Rule
            </Button>
          </NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.right} />
      </HeaderNavigation>
      <SyncSheet />
      <AddModal />
      <Editor />
    </div>
  )
}

export default Popup
