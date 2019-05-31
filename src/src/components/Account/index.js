import React, { Component } from "react";
import { compose } from "recompose";

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import { withFirebase } from "../Firebase";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";

const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null
  },
  {
    id: "google.com",
    provider: "googleProvider"
  },
  {
    id: "facebook.com",
    provider: "facebookProvider"
  }
];

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="container">
        <h5 className="center"><b>Account:</b> {authUser.email}</h5>
        <PasswordForgetForm />
        <PasswordChangeForm />
        <LoginManagement authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch(error => this.setState({ error }));
  };

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <div>
        <h5>Sign In Methods:</h5>
        <ul>
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(signInMethod.id);

            return (
              <li key={signInMethod.id}>
                {signInMethod.id === "password" ? (
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onDefaultLoginLink}
                    onUnlink={this.onUnlink}
                  />
                ) : (
                  <SocialLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onSocialLoginLink}
                    onUnlink={this.onUnlink}
                  />
                )}
              </li>
            );
          })}
        </ul>
        {error && error.message}
      </div>
    );
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) =>
  isEnabled ? (
    <div className="input-field">
      <button type="button" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft} className="btn orange darken-2 z-depth-1">
        Deactivate {signInMethod.id}
      </button>
    </div>
  ) : (
    <div className="input-field">
      <button type="button" onClick={() => onLink(signInMethod.provider)} className="btn orange darken-2 z-depth-1">
        Link {signInMethod.id}
      </button>
    </div>
  );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne1: "", passwordTwo2: "" };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne1);
    this.setState({ passwordOne1: "", passwordTwo2: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props;

    const { passwordOne1, passwordTwo2 } = this.state;

    const isInvalid = passwordOne1 !== passwordTwo2 || passwordOne1 === "";

    return isEnabled ? (
      <div className="input-field">
        <button type="button" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft} className="btn orange darken-2 z-depth-1">
          Deactivate {signInMethod.id}
        </button>
      </div>
    ) : (
      <form onSubmit={this.onSubmit}>
        <div className="input-field">
          <i className="material-icons prefix">lock_outline</i>
          <input type="password" name="passwordOne1" id="passwordOne1" value={passwordOne1} onChange={this.onChange}/>
          <label htmlFor="passwordOne1">New password</label>
        </div>
        <div className="input-field">
          <i className="material-icons prefix">vpn_key</i>
          <input type="password" name="passwordTwo2" id="passwordTwo2" value={passwordTwo2} onChange={this.onChange}/>
          <label htmlFor="passwordTwo2">Confirm new password</label>
        </div>
        <div className="input-field">
          <button disabled={isInvalid} type="submit" className="btn orange darken-2 z-depth-1">
            Link {signInMethod.id}
          </button>
        </div>
      </form>
    );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
