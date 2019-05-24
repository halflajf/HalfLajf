import React, { Component } from 'react'
import MemesList from '../memes/MemesList'

class Main extends Component {
  render(){
    return(
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <MemesList />
          </div>
        </div>
      </div>
    )
  }
}

export default Main