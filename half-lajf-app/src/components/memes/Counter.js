import React from 'react'
import './Counter.css'

const Counter = () => {
  return (
    <div className="counter center">
      <p>
        <i className="material-icons icon-red">thumb_down</i>
          <span className="like-counter">Shitload of likes.</span>
        <i className="material-icons icon-green">thumb_up</i>
      </p>
    </div>
  )
}

export default Counter