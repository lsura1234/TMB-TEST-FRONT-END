import { Route, Switch } from 'react-router-dom'
import React, { lazy } from 'react'

const Home = lazy(() => import('./pages/Home'))

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route component={() => <div>404 Page not found</div>} />
  </Switch>
)
