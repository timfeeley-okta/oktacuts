import { Dialog, Text } from 'evergreen-ui'
import React, { FC } from 'react'

const About: FC<{
  isShown: boolean
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isShown, setIsShown }) => (
  <Dialog
    isShown={isShown}
    title="Oktacuts 1.0"
    onCloseComplete={() => setIsShown(false)}
    hasCancel={false}
    hasClose={false}
    confirmLabel="Neat">
    <Text>
      <p>
        <strong>
          This is a unofficial hobby project and is not affiliated with or
          supported by Okta in any way.
        </strong>
      </p>
      <p>Add any shortcuts you’d like, for instance:</p>
      <table style={{ margin: 'auto' }}>
        <tr style={{ fontWeight: 'bold' }}>
          <td
            style={{
              borderBottom: '1px solid #dedede',
              width: '50px',
            }}>
            Shortcut
          </td>
          <td width="10"></td>
          <td style={{ borderBottom: '1px solid #dedede' }}>URL</td>
        </tr>
        <tr>
          <td>
            <kbd>m</kbd>
          </td>
          <td width="10"></td>
          <td>https://mail.google.com/</td>
        </tr>
        <tr>
          <td>
            <kbd>c</kbd>
          </td>
          <td width="10"></td>
          <td>https://calendar.google.com/</td>
        </tr>
      </table>

      <p>
        Navigate to an Okta tab, and press Okta sync to quickly assign shortcuts
        to Okta apps.
      </p>
      <p>
        That’s about it. Head to{' '}
        <a
          href="https://github.com/timfeeley-okta/oktacuts"
          target="_blank"
          rel="noreferrer">
          Github
        </a>{' '}
        with questions, issues, PRs and the like!
      </p>
    </Text>
  </Dialog>
)

export default About
