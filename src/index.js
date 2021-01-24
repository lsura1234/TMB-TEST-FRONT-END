import React from 'react'
import { render } from 'react-dom'
import * as serviceWorker from './serviceWorker'
import App from './App'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('No root element')
}

render(<App />, rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
