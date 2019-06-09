import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

class UploadMeme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      title: "",
      tags: ""
    };
  }

  onChangeUrl = event => {
    this.setState({ url: event.target.value });
  };

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  onChangeTags = event => {
    this.setState({ tags: event.target.value });
  };

  onSerializeTags = () => this.state.tags.split(" ");

  onCreateMem = (event, authUser) => {
    let tags = [];

    this.props.firebase.memes().push({
      url: this.state.url,
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      title: this.state.title,
      tags: this.onSerializeTags(),
      comments: []
    });

    this.setState({ url: "", title: "", tags: "" });

    event.preventDefault();
  };

  render() {
    const { url, title, tags } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="container">
            <h5 className="center"><b>Upload your meme:</b></h5>
            <form onSubmit={event => this.onCreateMem(event, authUser)}>
              <div className="input-field">
                <input type="text" id="url" value={url} onChange={this.onChangeUrl}/>
                <label htmlFor="url">Meme url</label>
              </div>
              <div className="input-field">
                <input type="text" id="title" value={title} onChange={this.onChangeTitle}/>
                <label htmlFor="title">Meme title</label>
              </div>
              <div className="input-field">
                <input type="text" id="tags" value={tags} onChange={this.onChangeTags}/>
                <label htmlFor="tags">Meme tags</label>
              </div>
              <div className="input-field right-align">
                <button type="submit" className="btn orange darken-2 z-depth-1">Upload meme</button>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(UploadMeme);