import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { object } from 'prop-types'

import Logout from './auth/Logout'

const Navbar = ({ session }) => {
  const handleAuth = () => {
    return session && session.currentUser ? (
      <Fragment>
        <NavLink to='/recipe/add'>Add Recipe</NavLink>
        <NavLink to='/user/profile'>
          Hello, {session.currentUser.username}!
        </NavLink>
        <Logout />
      </Fragment>
    ) : (
      <Fragment>
        <NavLink to='/auth/login'>Login</NavLink>
        <NavLink to='/auth/register'>Register</NavLink>
      </Fragment>
    )
  }

  return (
    <nav>
      <NavLink exact to='/'>
        Home
      </NavLink>
      <NavLink to='/recipe/search'>Search</NavLink>
      {handleAuth()}
    </nav>
  )
}

Navbar.propTypes = {
  session: object.isRequired
}

export default Navbar
