import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { func, object } from 'prop-types'

import history from '../utils/functions/history'
import withSession from '../utils/functions/withSession'

import Navbar from './Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Login from './auth/Login'
import Register from './auth/Register'
import AddRecipe from './recipe/AddRecipe'
import RecipePage from './recipe/RecipePage'

import '../styles/App.css'

const App = ({ refetch, session }) => (
  <Router history={history}>
    <Navbar session={session} />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/profile' component={Profile} />
      <Route path='/search' component={Search} />
      <Route path='/auth/login' render={() => <Login refetch={refetch} />} />
      <Route
        path='/auth/register'
        render={() => <Register refetch={refetch} />}
      />
      <Route
        path='/recipe/add'
        render={() => <AddRecipe session={session} />}
      />
      <Route path='/recipe/view/:id' component={RecipePage} />
    </Switch>
  </Router>
)

App.propTypes = {
  refetch: func.isRequired,
  session: object.isRequired
}

export default withSession(App)
