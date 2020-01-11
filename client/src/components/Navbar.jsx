import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const auth = false

  const handleAuth = () => {
    return auth ? (
      <Fragment>
        <NavLink to='/recipe/add'>Add Recipe</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <button>Logout</button>
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

export default Navbar
