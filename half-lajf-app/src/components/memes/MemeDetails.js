import React, { Component } from 'react'
import CommentList from './CommentList'
import M from "materialize-css"
import Counter from './Counter'

class MemeDetails extends Component {
  state = {
    userComment: '',
  }
  componentDidMount() {
    var elem = document.querySelector(".materialize-textarea");
      M.CharacterCounter.init(elem);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    var elem = document.querySelector(".materialize-textarea");
    elem.value='';
    elem.classList.remove('valid');
    M.textareaAutoResize(elem);
    M.updateTextFields();
    M.CharacterCounter.init(elem);
  }
  render() {
    return (
      <div className="container section meme-details">
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card z-depth-1">
              <div className="card-content grey-text text-darken-3">
                <span style={{fontWeight: "bold"}} className="card-title">Meme title</span>
                <p>Posted by <b>TheWojak2</b>, 1 day ago</p>
                <p>Tags: #janusz #wojak</p>
              </div>
              <div className="card-image">
                <img src={require('./testMeme.png')} alt="Dank meme"/>
              </div>
            </div>
          </div>
        </div>
        <Counter />
        <div className="container section comments">
          <h5 style={{fontWeight: "bold"}}>Comments:</h5>
          <form onSubmit={this.handleSubmit} className="white">
            <div className="input-field">
              <i className="material-icons prefix">border_color</i>
              <textarea className="materialize-textarea" id="userComment" data-length="250" maxlength="250" onChange={this.handleChange}></textarea>
              <label htmlFor="userComment">Share your thoughts about this meme</label>
            </div>
            <div className="input-field">
              <button className="btn orange darken-2 z-depth-1">Submit comment</button>
            </div>
        </form>
          <CommentList />
        </div>
      </div>
    )
  }
}

export default MemeDetails
