import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import history from '../utils/functions/history'
import withSession from '../utils/functions/withSession'

import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'

const App = ({ refetch }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/auth/login' render={() => <Login refetch={refetch} />} />
        <Route
          path='/auth/register'
          render={() => <Register refetch={refetch} />}
        />
      </Switch>
    </Router>
  )
}

export default withSession(App)
