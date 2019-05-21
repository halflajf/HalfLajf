import React, { Component } from "react";
import CommentList from "./CommentList";

class MemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editUrlMode: false,
      editUrl: this.props.mem.url,
      comment: ""
    };
  }
  onToggleEditUrlMode = () => {
    this.setState(state => ({
      editUrlMode: !state.editUrlMode,
      editUrl: this.props.mem.url
    }));
  };

  onChangeEditUrl = event => {
    this.setState({ editUrl: event.target.value });
  };

  onSaveEditUrl = () => {
    this.props.onEditMem(this.props.mem, this.state.editUrl);

    this.setState({ editUrlMode: false });
  };

  onSaveEditComment = () => {
    this.props.onAddComment(
      this.props.mem,
      this.state.comment,
      this.props.authUser
    );

    this.setState({ editUrlMode: false, comment: "" });
  };

  onChangeComment = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { authUser, mem, onRemoveMem } = this.props;
    const { editUrlMode, editUrl, comment } = this.state;

    return (
      <li>
        {editUrlMode ? (
          <input type="text" value={editUrl} onChange={this.onChangeEditUrl} />
        ) : (
          <span>
            <strong>{mem.userId}</strong> <img src={mem.url} />
          </span>
        )}
        {authUser.uid === mem.userId && (
          <span>
            {editUrlMode ? (
              <span>
                <button onClick={this.onSaveEditUrl}>Save</button>
                <button onClick={this.onToggleEditUrlMode}>Return</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditUrlMode}>Edit</button>
            )}
            {!editUrlMode && (
              <button type="button" onClick={() => onRemoveMem(mem.uid)}>
                Delete
              </button>
            )}
            {mem.comments ? (
              <CommentList comments={mem.comments} MemUid={mem.uid} />
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

export default MemItem;
