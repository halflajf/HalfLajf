import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
  return (
    <div>
      <ul id="nav-mobile" class="right">
        <li><NavLink to='/'>Your profile</NavLink></li>
        <li><NavLink to='/'><span class="red-text">Sign out</span></NavLink></li>
      </ul>
    </div>
  )
}

export default SignedInLinks