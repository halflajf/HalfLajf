import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import MemList from "./MemList";
import * as ROLES from "../../constants/roles";

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
  onListenForMemes() {
    this.setState({ loading: true });

    this.props.firebase
      .memes()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", snapshot => {
        // convert messages list from snapshot
        const memObject = snapshot.val();
        {
          console.log(memObject);
        }
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
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      comments: [],
      title: this.state.title
    });

    this.setState({ url: "", title: "" });

    event.preventDefault();
  };

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
    const { url, memes, loading, title } = this.state;

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
            {!authUser ? (
              <span />
            ) : (
              <span>
                {authUser.roles.includes(ROLES.ADMIN) && (
                  <form onSubmit={event => this.onCreateMem(event, authUser)}>
                    img src
                    <input
                      type="text"
                      value={url}
                      onChange={this.onChangeText}
                    />
                    title
                    <input
                      type="text"
                      value={title}
                      onChange={this.onChangeTitle}
                    />
                    <button type="submit">Send</button>
                  </form>
                )}
              </span>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(MemesBase);
