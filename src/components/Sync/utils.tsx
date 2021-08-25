import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
export const NoConnection = () => {
  return (
    <div className="text-center">
      <ExclamationCircleIcon className="w-12 h-12 mx-auto text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Not Connected</h3>
      <p className="mt-1 text-sm text-gray-500">
        Enter your Okta url (e.g. <kbd>https://acme.okta.com</kbd>) to get
        started.
      </p>
    </div>
  )
}
