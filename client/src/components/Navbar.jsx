import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <NavLink exact to='/'>
        Home
      </NavLink>
      <br />
      <NavLink to='/recipe/search'>Search</NavLink>
      <br />
      <NavLink to='/auth/login'>Login</NavLink>
      <br />
      <NavLink to='/auth/register'>Register</NavLink>
      <br />
    </nav>
  )
}

export default Navbar
