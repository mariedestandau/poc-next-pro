import * as React from 'react'

import { ReactComponent as Logo } from 'icons/logo-pass-culture-dark.svg'

import { Spinner } from '../Layout/Spinner/Spinner'

export const LoaderPage = (): JSX.Element => (
  <>
    <header>
      <Logo />
    </header>
    <main className="loader-page">
      {' '}
      <Spinner message="Chargement en cours" />
    </main>
  </>
)
