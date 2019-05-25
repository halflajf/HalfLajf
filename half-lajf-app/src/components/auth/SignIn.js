import React, { Component } from 'react'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
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
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="black-text">Sign In With Email</h5>
            <div className="input-field">
              <i className="material-icons prefix">mail_outline</i>
              <input type="email" id="email" onChange={this.handleChange}/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">lock_outline</i>
              <input type="password" id="password" onChange={this.handleChange}/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field">
              <button className="btn orange darken-2 z-depth-1">Login</button>
            </div>
        </form>
        <div className="container">
          <h6 className="black-text center">Or Sign In With Social Media:</h6>
          <header className="center">
            <a href="#">
              <img src={require('../../resources/iconfinderGoogle.png')} alt="Google login" style={{width: 48, height: 48, marginRight: 8}}/>
            </a>
            <a href="#">
              <img src={require('../../resources/iconfinderFacebook.png')} alt="Facebook login" style={{width: 48, height: 48, marginLeft: 8}}/>
            </a>
          </header>
        </div>
      </div>
    )
  }
}

export default SignIn
