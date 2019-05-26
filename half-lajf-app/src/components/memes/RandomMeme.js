import React from 'react'

const RandomMeme = () => {
  return (
    <div className="container random-memes">
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <h3 className="center">Random Meme</h3>
          <p className="center">Bored at work? Than grab a random meme! Just remeber, if you like it, don't forget to save it - once it's gone, it's gone!</p>
          <div style={{textAlign: 'center', marginBottom: 15}}>
            <a className="btn orange darken-2 z-depth-1">Re-roll</a>
          </div>
          <div className="card z-depth-1 random-meme">
            <div className="card-image">
              <img src={require('./randomMemeTest.jpg')} alt="Random meme"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default RandomMeme