import React, { Component } from 'react'

export class Profile extends Component {
  state = {

  }
  render() {
    return (
      <div className="container">
        <h5 className="black-text">About user:</h5>
          <p>Full name: </p>
          <p>Email: </p>
          <p>Password </p>
          <p>Link your social media accounts:</p>
          <p><a href="#">
            <img src={require('../../resources/iconfinderGoogle.png')} alt="Google login" style={{width: 24, height: 24}}/>
          </a> Currently unlinked</p>
          <p><a href="#">
            <img src={require('../../resources/iconfinderFacebook.png')} alt="Google login" style={{width: 24, height: 24}}/>
          </a> Currently unlinked</p>
      </div>
    )
  }
}

export default Profile
