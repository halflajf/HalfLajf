import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import Sidenav from './Sidenav'
import M from "materialize-css"

class Navbar extends Component {
  componentDidMount(){
    var elem = document.querySelector(".dropdown-trigger");
    M.Dropdown.init(elem,{
      coverTrigger: false,
      constrainWidth: false,
      inDuration: 380,
      outDuration: 380,
    });
  }
  render(){
    return (
      <div className="navbar-fixed" style={{zIndex: 999}}>
        <nav className="nav-extended">
          <div className="nav-wrapper grey darken-3">
          <Link to='/' className="brand-logo orange-text text-darken-2 left" style={{paddingLeft: 10}}>HalfLajf</Link>
          <Sidenav />
          <SignedInLinks />
          <SignedOutLinks />
          <ul className="right hide-on-med-and-down">
            <ul id="dropdown1" className="dropdown-content">
              <li><a href="#" className="black-text">Category 1</a></li>
              <li className="divider"></li>
              <li><a href="#" className="black-text">Category 2</a></li>
              <li className="divider"></li>
              <li><a href="#" className="black-text">Category 3</a></li>
            </ul>
            <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Categories<i className="material-icons right">arrow_drop_down</i></a></li>
            <li><Link to='/randomMeme'>Random meme</Link></li>
          </ul>
        </div>
        </nav>
      </div>
    );
  }
}

export default Navbar