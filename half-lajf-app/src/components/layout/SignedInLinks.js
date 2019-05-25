import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
  return (
    <div>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to='/'>Your profile</NavLink></li>
        <li><NavLink to='/' className="red-text">Sign out</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedInLinks