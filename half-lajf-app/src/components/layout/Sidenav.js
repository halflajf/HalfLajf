import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import M from "materialize-css"

class Sidenav extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
        edge: "right",
    });
  }

  render() {
    return (
      <div>
        <ul id="mobile-demo" className="sidenav">
          <li><Link to='/'>Categories</Link></li>
          <li><Link to='/'>Random meme</Link></li>
          <li><Link to='/'>Sign up</Link></li>
          <li><Link to='/'>Sign in</Link></li>
          <li><Link to='/'>Your profile</Link></li>
          <li><Link to='/' class="red-text">Sign out</Link></li>
        </ul>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
      </div>
    );
  }
}

export default Sidenav