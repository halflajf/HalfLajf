import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import M from "materialize-css"
import './Sidenav.css'

class Sidenav extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
        edge: "right",
    });
    var elems = document.querySelector('.collapsible');
    M.Collapsible.init(elems, {
      inDuration: 380,
    });
  }
  render() {
    return (
      <div>
        <ul id="mobile-demo" className="sidenav">
          <li>
            <ul className="collapsible">
              <li>
                <div className="collapsible-header black-text"><i className="material-icons collapsible-secondary">arrow_drop_down</i><b>Categories</b></div>
                <div className="collapsible-body black-text">
                  <a href='#' className="black-text sidenav-close"><span style={{marginLeft: 16}}>Category</span></a>
                  <a href='#' className="black-text sidenav-close"><span style={{marginLeft: 16}}>Category</span></a>
                  <a href='#' className="black-text sidenav-close"><span style={{marginLeft: 16}}>Category</span></a>
                  <a href='#' className="black-text sidenav-close"><span style={{marginLeft: 16}}>Category</span></a>
                  <a href='#' className="black-text sidenav-close"><span style={{marginLeft: 16}}>Category</span></a>
                </div>
              </li>
            </ul>
          </li>
          <li><NavLink to='/randomMeme' className="sidenav-close">Random meme</NavLink></li>
          <li><NavLink to='/signup' className="sidenav-close">Sign up</NavLink></li>
          <li><NavLink to='/signin' className="sidenav-close">Sign in</NavLink></li>
          <li><NavLink to='/' className="sidenav-close">Your profile</NavLink></li>
          <li><NavLink to='/' className="red-text sidenav-close">Sign out</NavLink></li>
        </ul>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons" >menu</i></a>
      </div>
    );
  }
}

export default Sidenav