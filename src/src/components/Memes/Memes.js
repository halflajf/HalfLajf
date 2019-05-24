import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import MemList from "./MemList";

class MemesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      memes: [],
      url: "",
      title: "",
      limit: 5
    };
  }

  componentDidMount() {
    this.onListenForMemes();
  }
  onNextPage = () => {
    this.setState(state => ({ limit: state.limit + 5 }), this.onListenForMemes);
  };

  onAddComment = (mem, message, authUser) => {
    const { uid, ...memSnapshot } = mem;
    let { comments } = mem;
    let comment = {
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      comment: message,
      isDeleted: false
    };

    if (!comments) comments = [];

    comments.push(comment);
    this.props.firebase.mem(mem.uid).set({
      ...memSnapshot,
      comments
    });
  };
  onListenForMemes() {
    this.setState({ loading: true });

    this.props.firebase
      .memes()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", snapshot => {
        // convert messages list from snapshot
        const memObject = snapshot.val();

        if (memObject) {
          // convert messages list from snapshot
          const memesList = Object.keys(memObject).map(key => ({
            ...memObject[key],
            uid: key
          }));
          this.setState({ loading: false, memes: memesList });
        } else {
          this.setState({ memes: null, loading: false });
        }
        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this.props.firebase.memes().off();
  }

  onEditMem = (mem, url) => {
    const { uid, ...memSnapshot } = mem;

    this.props.firebase.mem(mem.uid).set({
      ...memSnapshot,
      url,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  onRemoveMem = uid => {
    this.props.firebase.mem(uid).remove();
  };

  render() {
    const { memes, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {memes && !loading && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {memes ? (
              <MemList
                authUser={authUser}
                memes={memes}
                onRemoveMem={this.onRemoveMem}
                onEditMem={this.onEditMem}
                onAddComment={this.onAddComment}
              />
            ) : (
              <div>There are no memes ...</div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(MemesBase);
