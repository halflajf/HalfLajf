import React, { Component } from 'react'
import CommentList from './CommentList'

export class MemeDetails extends Component {
  render() {
    return (
      <div className="container section meme-details">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card z-depth-1">
              <div className="card-content grey-text text-darken-3">
                <span style={{fontWeight: "bold"}} className="card-title">Meme title</span>
                <p>Posted by TheWojak2</p>
              </div>
              <div class="card-image">
                <img src={require('./testMeme.png')} alt="Dank meme"/>
              </div>
            </div>
          </div>
        </div>
        <div className="container section comments">
          <h5 style={{fontWeight: "bold"}}>Comments:</h5>
          <CommentList />
        </div>
      </div>
    )
  }
}

export default MemeDetails
