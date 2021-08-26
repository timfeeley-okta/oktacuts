import * as React from 'react'

import { useAppDispatch, useAppSelector } from '@/state/index'

import { setUI } from '@/state/ui'

import Drawer from '@/components/Drawer'

const AboutModal = () => {
  const dispatch = useAppDispatch()
  const isShowing = useAppSelector(({ ui }) => ui)

  const closeSheet = () => {
    dispatch(setUI({ uiElement: 'aboutModal', value: false }))
  }

  return (
    <Drawer show={isShowing.aboutModal} onClose={closeSheet}>
      <section className="p-6 text-lg font-bold bg-gray-100">About</section>
      <div className="p-6 prose">
        <p>This extension is a side project from Tim Feeley.</p>
        <p>
          It’s not affiliated with, supported by or otherwise related to Okta.
        </p>
        <p>
          For more information and to get involved, report a bug or fix my
          terrible code, visit{' '}
          <a
            href="https://github.com/timfeeley-okta/oktacuts"
            target="_blank"
            rel="noreferrer">
            GitHub
          </a>
          .
        </p>
        <p>Enjoy!</p>
      </div>
    </Drawer>
  )
}

export default AboutModal
