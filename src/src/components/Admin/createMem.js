import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

class CreateMem extends Component {
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

  onCreateMem = (event, authUser) => {
    this.props.firebase.memes().push({
      url: this.state.url,
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      title: this.state.title,
      tags: this.state.tags,
      comments: []
    });

    this.setState({ url: "", title: "" });

    event.preventDefault();
  };

  render() {
    const { url, title, tags } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <form onSubmit={event => this.onCreateMem(event, authUser)}>
              img src
              <input type="text" value={url} onChange={this.onChangeUrl} />
              title
              <input type="text" value={title} onChange={this.onChangeTitle} />
              tags
              <input type="text" value={tags} onChange={this.onChangeTags} />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(CreateMem);
