import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import Sidenav from './Sidenav'

const Navbar = () => {
  return (
    <div class="navbar-fixed" style={{zIndex: 999}}>
      <nav class="nav-extended">
        <div class="nav-wrapper grey darken-3">
        <Link to='/' className="brand-logo left"><span class="orange-text text-darken-2">HalfLajf</span></Link>
        <Sidenav />
        <SignedInLinks />
        <SignedOutLinks />
        <ul class="right hide-on-med-and-down">
          <li><Link to='/'>Categories</Link></li>
          <li><Link to='/'>Random meme</Link></li>
        </ul>
      </div>
      </nav>
    </div>
  )
}

export default Navbar