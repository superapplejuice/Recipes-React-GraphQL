import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <div>
    <Link to='/'>Home</Link>
    <Link to='/auth/login'>Login</Link>
    <Link to='/auth/register'>Register</Link>
  </div>
)

export default Navbar
