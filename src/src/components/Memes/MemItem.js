import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import CommentItem from "./CommentItem";

class MemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.mem.url,
      comment: ""
    };
  }
  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.mem.url
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMem(this.props.mem, this.state.editText);

    this.setState({ editMode: false });
  };

  onSaveEditComment = () => {
    this.props.onAddComment(
      this.props.mem,
      this.state.comment,
      this.props.authUser
    );

    this.setState({ editMode: false, comment: "" });
  };

  onChangeComment = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { authUser, mem, onRemoveMem } = this.props;
    const { editMode, editText, comment } = this.state;
    const dupa = mem.comments;
    const memUid = this.props.mem.uid;
    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            {console.log(mem)}
            <strong>{mem.userId}</strong> <img src={mem.url} />
            {mem.editedAt && <span>(Edited)</span>}
          </span>
        )}
        {authUser.uid === mem.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}
            {!editMode && (
              <button type="button" onClick={() => onRemoveMem(mem.uid)}>
                Delete
              </button>
            )}
            {dupa ? (
              <CommentList memes={dupa} uid={memUid} />
            ) : (
              <div>There are no comments ...</div>
            )}
            <input
              type="text"
              value={comment}
              onChange={this.onChangeComment}
            />

            <button onClick={this.onSaveEditComment}>Add comment</button>
          </span>
        )}
      </li>
    );
  }
}

const CommentList = ({ memes, uid }) => (
  <ul>
    {memes.map((mem, i) => (
      <CommentItem key={i} mem={mem} pentla={i} uid={uid} />
    ))}
  </ul>
);

export default MemItem;
