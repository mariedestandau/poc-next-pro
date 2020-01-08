const fs = require('fs')
const path = require('path')
const paths = require('./paths')

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')]

const { NODE_ENV } = process.env
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.')
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean)

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    })
  }
})

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd())
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter)

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
      {
        API_URL: process.env.API_URL || 'http://localhost',
        WEBAPP_ALGOLIA_APPLICATION_ID: process.env.WEBAPP_ALGOLIA_APPLICATION_ID,
        WEBAPP_ALGOLIA_SEARCH_API_KEY: process.env.WEBAPP_ALGOLIA_SEARCH_API_KEY,
        WEBAPP_ALGOLIA_INDEX_NAME: process.env.WEBAPP_ALGOLIA_INDEX_NAME,
        ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
        HAS_WORKERS: process.env.HAS_WORKERS || false,
        MATOMO_SERVER_URL: process.env.MATOMO_SERVER_URL,
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: publicUrl,
        TYPEFORM_URL_CULTURAL_PRACTICES_POLL:
          process.env.TYPEFORM_URL_CULTURAL_PRACTICES_POLL ||
          'https://passculture.typeform.com/to/T8rurj',
        SENTRY_SERVER_URL_FOR_WEBAPP: process.env.SENTRY_SERVER_URL_FOR_WEBAPP,
        URL_FOR_MAINTENANCE: process.env.WEBAPP_URL_FOR_MAINTENANCE,
        MAINTENANCE_PAGE_AVAILABLE: process.env.MAINTENANCE_PAGE_AVAILABLE === 'true' || false,
      }
    )
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {}),
  }

  return { raw, stringified }
}

module.exports = getClientEnvironment
