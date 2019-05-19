import React, { Component } from "react";

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
    this.props.onAddComment(this.props.mem, this.state.comment);

    this.setState({ editMode: false, comment: "" });
  };

  onChangeComment = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { authUser, mem, onRemoveMem } = this.props;
    const { editMode, editText, comment } = this.state;

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
          </span>
        )}
        <CommentList memes={mem} />
        <input type="text" value={comment} onChange={this.onChangeComment} />
        <button onClick={this.onSaveEditComment}>Add comment</button>
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
export default MemItem;
