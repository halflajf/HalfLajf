import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import M from "materialize-css";

import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { auth } from "firebase";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationInternal authenticated={true} authUser={authUser} />
      ) : (
        <NavigationInternal authenticated={false} />
      )
    }
  </AuthUserContext.Consumer>
);

const SignedInLinks = () => {
  return (
    <div>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <NavLink to={ROUTES.ACCOUNT}>Your profile</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.LANDING}>
            <SignOutButton />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const SignedOutLinks = () => {
  return (
    <div>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <NavLink to={ROUTES.SIGN_UP}>Sign up</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink>
        </li>
      </ul>
    </div>
  );
};

class Sidenav extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "right"
    });
    var elems = document.querySelector(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 380
    });
  }
  render() {
    return (
      <div>
        <ul id="mobile-demo" className="sidenav">
          <li>
            <NavLink to={ROUTES.RANDOM_MEM} className="sidenav-close">
              Random meme
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.SIGN_UP} className="sidenav-close">
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.SIGN_IN} className="sidenav-close">
              Sign in
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.ACCOUNT} className="sidenav-close">
              Your profile
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.LANDING} className="red-text sidenav-close">
              Sign out
            </NavLink>
          </li>
        </ul>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger right">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

class NavigationInternal extends Component {
  componentDidMount() {
    var elem = document.querySelector(".dropdown-trigger");
    M.Dropdown.init(elem, {
      coverTrigger: false,
      constrainWidth: false,
      inDuration: 380,
      outDuration: 380
    });
  }
  render() {
    return (
      <div className="navbar-fixed" style={{ zIndex: 999 }}>
        <nav className="nav-extended">
          <div className="nav-wrapper grey darken-3">
            <Link
              to="/"
              className="brand-logo orange-text text-darken-2 left"
              style={{ paddingLeft: 10 }}
            >
              HalfLajf
            </Link>
            <Sidenav />
            {this.props.authenticated ? <SignedInLinks /> : <SignedOutLinks />}
            <ul className="right hide-on-med-and-down">
              <ul id="dropdown1" className="dropdown-content" />

              <li>
                <Link to={ROUTES.RANDOM_MEM}>Random meme</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;