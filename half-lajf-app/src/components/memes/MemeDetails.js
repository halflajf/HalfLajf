import React, { Component } from 'react'

export class MemeDetails extends Component {
  render() {
    return (
      <div className="container section meme-details">
        <div className="row">
          <div className="col s12 m6 offset-m3">
          <div className="card z-depth-1">
            <div className="card-content grey-text text-darken-3">
              <span style={{fontWeight: "bold"}} className="card-title">Meme title</span>
              <p>Dodane przez TheWojak2</p>
            </div>
            <div class="card-image">
              <img src={require('./testMeme.png')} />
            </div>
            <div className="container section comments">
              <p>TUTAJ WLECĄ KOMENTARZE, JESZCZE NIE WIEM JAK ALE WLECĄ
                SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT
                SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MemeDetails
