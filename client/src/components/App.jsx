import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import history from '../utils/history'

import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect to='/' />
        <Route exact path='/' component={Home} />
        <Route path='/auth/login' component={Login} />
        <Route exact path='/auth/register' component={Register} />
      </Switch>
    </Router>
  )
}

export default App
