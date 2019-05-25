import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import MemList from "./MemList";

class MemesBase extends Component {
  constructor(props) {
    super(props);
  }

  onAddComment = (mem, message, authUser) => {
    const { uid, ...memSnapshot } = mem;
    let { comments } = mem;
    let comment = {
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      comment: message
    };

    if (!comments) comments = [];

    comments.push(comment);
    this.props.firebase.mem(mem.uid).set({
      ...memSnapshot,
      comments
    });
  };

  render() {
    const { memes } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {memes ? (
              <MemList
                authUser={authUser}
                memes={memes}
                onAddComment={this.onAddComment}
              />
            ) : (
              <div />
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(MemesBase);
