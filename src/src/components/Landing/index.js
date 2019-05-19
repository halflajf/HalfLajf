import React, { Component } from "react";
import { withFirebase } from "../Firebase";

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

  onAddComment = (mem, comm) => {
    const { uid, ...memSnapshot } = mem;
    let { comment } = mem;

    if (comment[0] == "0") {
      comment.splice(0, 1, comm);
    }
    comment.push(comm);
    this.props.firebase.mem(mem.uid).set({
      ...memSnapshot,
      comment
    });
  };

  componentWillUnmount() {
    this.props.firebase.memes().off();
  }

  render() {
    const { memes, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}
        {memes ? (
          <MessageList messages={memes} onAddComment={this.onAddComment} />
        ) : (
          <div>There are no memes ...</div>
        )}
      </div>
    );
  }
}

const MessageList = ({ messages, onAddComment }) => (
  <ul>
    {messages.map(message => (
      <MemItem
        key={message.uid}
        message={message}
        onAddComment={onAddComment}
      />
    ))}
  </ul>
);

/*
const MessageItem = ({ message }) => (
  <li>
    <strong>User id: {message.userId} </strong>
    <strong> title {message.title}</strong>
    <br />
    <img src={message.url} />
  </li>
);
*/

class MemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ""
    };
  }

  onSaveEditText = () => {
    this.props.onAddComment(this.props.message, this.state.comment);

    this.setState({ comment: "" });
  };

  onChangeComment = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { message } = this.props;
    const { comment } = this.state;

    return (
      <li>
        <span>
          <strong>User id: {message.userId} </strong>
          <strong> title {message.title}</strong>
          <br />
          <img src={message.url} />
          <CommentList memes={message} />
          <input type="text" value={comment} onChange={this.onChangeComment} />
          <button onClick={this.onSaveEditText}>Add comment</button>
        </span>
      </li>
    );
  }
}

const CommentList = ({ memes }) => (
  <ul>
    {memes.comment.map((mem, i) => (
      <CommentItem key={i} mem={mem} />
    ))}
  </ul>
);

const CommentItem = ({ mem }) => (
  <li>
    <strong>{mem.userId}</strong> {mem}
  </li>
);

const DisplayMemes = withFirebase(DisplayMemesBase);

export default Landing;
