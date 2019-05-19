import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul id="nav-mobile" class="right">
        <li><NavLink to='/'>Sign up</NavLink></li>
        <li><NavLink to='/'>Sign in</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks