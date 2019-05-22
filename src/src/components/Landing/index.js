import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import Memes from "../Memes";

const Landing = () => (
  <div>
    <h1>Landing</h1>
    <DisplayMemes />
  </div>
);

class DisplayMemesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      memes: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.memes().on("value", snapshot => {
      // convert messages list from snapshot
      const memObject = snapshot.val();

      if (memObject) {
        // convert messages list from snapshot
        const memList = Object.keys(memObject).map(key => ({
          ...memObject[key],
          uid: key
        }));
        this.setState({ memes: memList, loading: false });
      } else {
        this.setState({ memes: null, loading: false });
      }
    });
  }

  onAddComment = (mem, message, authUser) => {
    const { uid, ...memSnapshot } = mem;
    let { comments } = mem;

    let comment = {
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      comment: message
    };

    if (comments[0].comment == "Brak komentarzy") {
      comments.splice(0, 1);
    }
    comments.push(comment);

    this.props.firebase.mem(mem.uid).set({
      ...memSnapshot,
      comments
    });
  };

  componentWillUnmount() {
    this.props.firebase.memes().off();
  }

  render() {
    const { memes, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}
            {memes ? (
              <MessageList
                messages={memes}
                onAddComment={this.onAddComment}
                authUser={authUser}
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

const MessageList = ({ messages, onAddComment, authUser }) => (
  <ul>
    {messages.map(message => (
      <MemItem
        key={message.uid}
        message={message}
        onAddComment={onAddComment}
        authUser={authUser}
      />
    ))}
  </ul>
);

class MemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      authUser: {
        uid: this.props.authUser
      }
    };
  }

  onSaveEditText = () => {
    this.props.onAddComment(
      this.props.message,
      this.state.comment,
      this.props.authUser
    );

    this.setState({ comment: "" });
  };

  onChangeComment = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { comment, authUser } = this.state;
    const { message } = this.props;
    const memUid = this.props.message.uid;

    return (
      <li>
        <span>
          <strong>User id: {message.userId} </strong>
          <strong> title {message.title}</strong>
          <br />
          <img src={message.url} />
          {authUser.uid && (
            <span>
              <input
                type="text"
                value={comment}
                onChange={this.onChangeComment}
              />
              <button onClick={this.onSaveEditText}>Add comment</button>
            </span>
          )}
        </span>
      </li>
    );
  }
}

const CommentList = ({ memes, uid, authUser }) => (
  <ul>
    {memes.map((mem, i) => (
      <CommentItem key={i} mem={mem} pentla={i} uid={uid} authUser={authUser} />
    ))}
  </ul>
);

class BaseCommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.mem.comment,
      authUser: {
        uid: this.props.authUser.uid
      }
    };
  }
  onRemoveComment = (uid, id) => {
    this.props.firebase.comment(uid, id).remove();
  };

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.mem.comment
    }));
  };

  onEditMessage = (uid, mem, message, pentla) => {
    const { comment, ...commentSnapshot } = mem;

    this.props.firebase.comment(uid, pentla).set({
      comment: message,
      ...commentSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });

    this.setState({ editMode: false });
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  render() {
    const { editMode, editText, authUser } = this.state;
    const { mem, pentla, uid } = this.props;

    return (
      <span>
        <li>
          {editMode ? (
            <input
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
            />
          ) : (
            <span>
              {mem.comment} {mem.editedAt && <span>(Edited)</span>}
            </span>
          )}

          <span>
            {editMode ? (
              <span>
                <button
                  onClick={() => this.onEditMessage(uid, mem, editText, pentla)}
                >
                  Save
                </button>
                <button onClick={this.onToggleEditMode}>Cofnij</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button onClick={() => this.onRemoveComment(uid, pentla)}>
                Delete comment
              </button>
            )}
          </span>
        </li>
      </span>
    );
  }
}

/*
 {authUser.uid === message.userId && (
          <span>
       </span>
        )}

          */

const CommentItem = withFirebase(BaseCommentItem);
const DisplayMemes = withFirebase(DisplayMemesBase);

export default Landing;
