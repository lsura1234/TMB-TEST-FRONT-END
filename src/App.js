import { Global, css } from '@emotion/core'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { setConfig } from 'react-hot-loader'
import React, { Suspense } from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'glud-component/build/style.css'

import { history } from './utils'
import configureStore from './store/configureStore'
import route from './routes'

setConfig({
  pureSFC: true,
  reloadHooks: true
})

const store = configureStore(window.__INITIAL_STATE__)

const globalStyles = css`
  html,
  body {
    background: #fcfcfc;
  }
`

function Root() {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <Global styles={globalStyles} />
        <Router history={history}>{route}</Router>
      </Suspense>
    </Provider>
  )
}

if (module.hot) {
  module.hot.dispose(() => (window.__INITIAL_STATE__ = store.getState()))
}

export default (process.env.NODE_ENV === 'development' ? hot(Root) : Root)
