import {
  Button,
  Heading,
  InfoSignIcon,
  Pane,
  Pill,
  SideSheet,
} from 'evergreen-ui'
import React, { useState } from 'react'

import About from '../../components/containers/About'
import LinkTable from '../../components/containers/LinkTable'
import OktaSyncTable from '../../components/containers/OktaSync'
import { AppError } from '../../components/data/error'
import { OktaApp, trySync } from '../../components/data/okta'

const Popup = () => {
  const [isShown, setIsShown] = useState(false)
  const dataState = useState<chrome.declarativeNetRequest.Rule[]>()
  const payloadState = useState<OktaApp[]>()
  const errorState = useState<AppError>()
  const [getAboutState, setAboutState] = useState(false)

  return (
    <>
      <About isShown={getAboutState} setIsShown={setAboutState} />
      <SideSheet
        width="450px"
        isShown={isShown}
        onOpenComplete={() => {
          trySync(errorState, payloadState)
        }}
        onCloseComplete={() => setIsShown(false)}>
        <OktaSyncTable
          dataState={dataState}
          payloadState={payloadState}
          errorState={errorState}
        />
      </SideSheet>
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>oktacuts</Heading>
          <Pill
            onClick={() => {
              setAboutState(true)
            }}
            cursor="pointer"
            display="inline-flex"
            color="blue"
            margin={8}
            alignItems="center">
            1.0
            <InfoSignIcon marginLeft="3px" size={10} />
          </Pill>
        </Pane>
        <Pane>
          <Button onClick={() => setIsShown(true)}>Okta Sync</Button>
        </Pane>
      </Pane>
      <LinkTable dataState={dataState} />
    </>
  )
}

export default Popup
