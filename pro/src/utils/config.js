/* istanbul ignore file */
const NODE_ENV = process.env.NODE_ENV || 'development'

export const IS_DEV = NODE_ENV === 'development'

export const CGU_URL = 'https://pass.culture.fr/cgu-professionnels/'

// FIXME : Remove when transition to new domain is done
let apiUrlBasedOnDomain
if (typeof window !== 'undefined') {
  apiUrlBasedOnDomain = window.location.hostname.includes('beta.gouv')
    ? process.env.NEXT_PUBLIC_API_URL_OLD
    : process.env.NEXT_PUBLIC_API_URL_NEW
}
export const API_URL = apiUrlBasedOnDomain || 'http://localhost'

export const ENVIRONMENT_NAME = process.env.NEXT_PUBLIC_ENVIRONMENT_NAME
export const ENV_WORDING = process.env.NEXT_PUBLIC_ENV_WORDING
export const SENTRY_SAMPLE_RATE = process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE
export const SENTRY_SERVER_URL = process.env.NEXT_PUBLIC_SENTRY_SERVER_URL
export const NEXT_PUBLIC_DEMARCHES_SIMPLIFIEES_RIB_VENUE_PROCEDURE_ID_V4 =
  process.env.NEXT_PUBLIC_DEMARCHES_SIMPLIFIEES_RIB_VENUE_PROCEDURE_ID_V4
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
export const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL

if (
  process.env.NODE_ENV !== 'test' &&
  !process.env.NEXT_PUBLIC_URL_FOR_MAINTENANCE
) {
  throw new Error(
    'La variable d’environnement NEXT_PUBLIC_URL_FOR_MAINTENANCE doit être définie'
  )
}
export const URL_FOR_MAINTENANCE =
  process.env.NEXT_PUBLIC_URL_FOR_MAINTENANCE || ''

let CALC_ROOT_PATH = ''
if (typeof window !== 'undefined') {
  CALC_ROOT_PATH = window.location.protocol + '//' + document.location.host
}
export const ROOT_PATH =
  process.env.STORYBOOK_ROOT_PATH || CALC_ROOT_PATH || 'http://localhost:3001/'

export const LOGS_DATA = process.env.NEXT_PUBLIC_LOGS_DATA === 'true'
export const {
  NEXT_PUBLIC_ALGOLIA_APP_ID: ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_API_KEY: ALGOLIA_API_KEY,
  NEXT_PUBLIC_ALGOLIA_COLLECTIVE_OFFERS_INDEX: ALGOLIA_COLLECTIVE_OFFERS_INDEX,
  NEXT_PUBLIC_ASSETS_URL: ASSETS_URL,
} = process.env
