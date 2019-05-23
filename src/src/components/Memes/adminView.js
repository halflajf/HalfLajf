import React, { Component } from "react";

import { AuthUserContext } from "../Session";

class AdminView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      title: ""
    };
  }

  onChangeText = event => {
    this.setState({ url: event.target.value });
  };

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };
  onCreateMem = (event, authUser) => {
    this.props.firebase.memes().push({
      url: this.state.url,
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      title: this.state.title,
      comments: []
    });

    this.setState({ url: "", title: "" });

    event.preventDefault();
  };

  render() {
    const { url, title } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <form onSubmit={event => this.onCreateMem(event, authUser)}>
              img src
              <input type="text" value={url} onChange={this.onChangeText} />
              title
              <input type="text" value={title} onChange={this.onChangeTitle} />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default AdminView;
