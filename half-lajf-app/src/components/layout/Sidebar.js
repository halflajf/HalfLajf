import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
      <ul id="nav-mobile" class="left">
        <li><NavLink to='/'><span>Categories</span><i class="material-icons left">list</i></NavLink></li>
      </ul>
    </div>
  )
}

export default Sidebar