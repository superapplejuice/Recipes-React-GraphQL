import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import history from '../utils/functions/history'
import withSession from '../utils/functions/withSession'

import Navbar from './Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './auth/Login'
import Register from './auth/Register'
import Search from './recipe/Search'
import AddRecipe from './recipe/AddRecipe'

import '../styles/App.css'

const App = ({ refetch, session }) => {
  return (
    <Router history={history}>
      <Navbar session={session} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/auth/login' render={() => <Login refetch={refetch} />} />
        <Route
          path='/auth/register'
          render={() => <Register refetch={refetch} />}
        />
        <Route path='/recipe/search' component={Search} />
        <Route path='/recipe/add' component={AddRecipe} />
      </Switch>
    </Router>
  )
}

export default withSession(App)
