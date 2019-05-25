import React, { Component } from 'react'

class SignUp extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    confirmedPassword: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <div className = "container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="black-text">Sign Up</h5>
            <div className="input-field">
              <i className="material-icons prefix">account_circle</i>
              <input type="text" id="fullName" onChange={this.handleChange}/>
              <label htmlFor="fullName">Full Name</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">mail_outline</i>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
            <i className="material-icons prefix">lock_outline</i>
              <input type="password" id="password" onChange={this.handleChange}/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">vpn_key</i>
              <input type="password" id="confirmedPassword" onChange={this.handleChange}/>
              <label htmlFor="confirmedPassword">Confirm password</label>
            </div>
            <div className="input-field">
              <button className="btn orange darken-2 z-depth-1">Sign Up</button>
            </div>
        </form>
      </div>
    )
  }
}

export default SignUp
