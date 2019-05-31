import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-field">
          <i className="material-icons prefix">lock_outline</i>
          <input type="password" name="passwordOne" id="passwordOne" value={passwordOne} onChange={this.onChange}/>
          <label htmlFor="passwordOne">New password</label>
        </div>
        <div className="input-field">
          <i className="material-icons prefix">vpn_key</i>
          <input type="password" name="passwordTwo" id="passwordTwo" value={passwordTwo} onChange={this.onChange}/>
          <label htmlFor="passwordTwo">Confirm new password</label>
        </div>
        <div className="input-field right-align">
          <button disabled={isInvalid} type="submit" className="btn orange darken-2 z-depth-1">Change password</button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
