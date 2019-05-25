import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import MemList from "./MemList";

class MemesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      memes: this.props.memes,
      url: "",
      title: "",
      limit: 5
    };
  }

  /*
   componentDidMount() {
   this.onListenForMemes();
  }

  onNextPage = () => {
    this.setState(state => ({ limit: state.limit + 5 }), this.onListenForMemes);
  };
*/
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

  /*
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
*/
  componentWillUnmount() {
    this.props.firebase.memes().off();
  }

  render() {
    const { memes, loading } = this.props;

    console.log(memes);

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {memes && !loading && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}
            {console.log(memes)}
            {memes ? (
              <MemList
                authUser={authUser}
                memes={memes}
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
