import { Alert } from 'evergreen-ui'
import React from 'react'
import { FC } from 'react'

import { AppError } from '../data/error'

const SyncError: FC<AppError> = ({ error, details }) => {
  const message = {
    apps: {
      intent: 'warning',
      title: 'Got an empty set of apps',
      message: (
        <>
          <p>
            If I had a dollar for every error caught that “wasn’t supposed to
            happen” - I’d be rich. But this shouldn’t happen!
          </p>
          {details && <pre>{JSON.stringify(details)}</pre>}
        </>
      ),
    },
    sync: {
      intent: 'danger',
      title: 'Please navigate to a signed-in Okta instance',
      message: (
        <>
          <p>
            In order to retreive your apps, first navigate to an active,
            signed-in tab on your Okta domain (usually{' '}
            <code>acme.okta.com</code>).
          </p>
          <p>Navigate to an Okta tab and try again.</p>
          <p>
            <b>
              If you *JUST* installed this extension, refresh the Admin page,
              then retry.
            </b>
          </p>
          {details && <pre>{JSON.stringify(details)}</pre>}
        </>
      ),
    },
  }[error]
  console.log(error, details, message)
  if (message) {
    return (
      <Alert
        intent="danger"
        title={message.title}
        marginX="30px"
        marginY="30px">
        {message.message}
      </Alert>
    )
  } else {
    return (
      <Alert>
        Really bad error! {details && <pre>{JSON.stringify(details)}</pre>}
      </Alert>
    )
  }
}

export default SyncError
