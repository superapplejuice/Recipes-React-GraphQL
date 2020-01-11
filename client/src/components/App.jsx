import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import history from '../utils/functions/history'
import withSession from '../utils/functions/withSession'

import Navbar from './Navbar'
import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Search from './recipe/Search'

import '../styles/App.css'

const App = ({ refetch }) => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/auth/login' render={() => <Login refetch={refetch} />} />
        <Route
          path='/auth/register'
          render={() => <Register refetch={refetch} />}
        />
        <Route path='/recipe/search' component={Search} />
      </Switch>
    </Router>
  )
}

export default withSession(App)
