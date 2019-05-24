import React from 'react'

const MemeSummary = () => {
  return (
    <div className="card z-depth-1 meme-summary">
      <div className="card-content grey-text text-darken-3">
        <span style={{fontWeight: "bold"}} className="card-title">Meme Title</span>
      </div>
      <div class="card-image">
        <img src={require('./testMeme.png')} alt="Dank meme"/>
      </div>
    </div>
    )
}

export default MemeSummary