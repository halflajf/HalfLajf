import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import Sidebar from './Sidebar'

const Navbar = () => {
  return (
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper grey darken-3">
        <Sidebar />
        <Link to='/' className="brand-logo" ><span class="orange-text text-darken-2">HalfLajf</span></Link>
        <SignedInLinks />
        <SignedOutLinks />
        <ul id="nav-mobile" class="right">
          <li><Link to='/'>Random meme</Link></li>
        </ul>
      </div>
      </nav>
    </div>
  )
}

export default Navbar