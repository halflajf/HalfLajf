import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CommentEditMode: false,
      editComment: this.props.comment.comment
    };
  }
  onRemoveComment = (MemUid, index) => {
    {
      console.log(index);
    }
    this.props.firebase.comment(MemUid, index).remove();
  };

  onToggleCommentEditMode = () => {
    this.setState(state => ({
      CommentEditMode: !state.CommentEditMode,
      editComment: this.props.comment.comment
    }));
  };

  onEditMessage = (MemUid, commentObj, message, index) => {
    const { comment, ...commentSnapshot } = commentObj;

    this.props.firebase.comment(MemUid, index).set({
      comment: message,
      ...commentSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });

    this.setState({ CommentEditMode: false });
  };

  onChangeeditComment = event => {
    this.setState({ editComment: event.target.value });
  };

  render() {
    const { CommentEditMode, editComment } = this.state;
    const { comment, index, MemUid } = this.props;

    return (
      <span>
        <li>
          {CommentEditMode ? (
            <input
              type="text"
              value={editComment}
              onChange={this.onChangeeditComment}
            />
          ) : (
            <span>
              {comment.comment}
              {comment.editedAt && (
                <span> (Edited) DateToCount {comment.editedAt}</span>
              )}
            </span>
          )}

          {CommentEditMode ? (
            <span>
              <button
                onClick={() =>
                  this.onEditMessage(MemUid, comment, editComment, index)
                }
              >
                Save
              </button>
              <button onClick={this.onToggleCommentEditMode}>Cofnij</button>
            </span>
          ) : (
            <button onClick={this.onToggleCommentEditMode}>Edit</button>
          )}

          {!CommentEditMode && (
            <button onClick={() => this.onRemoveComment(MemUid, index)}>
              Delete comment
            </button>
          )}
        </li>
      </span>
    );
  }
}

export default withFirebase(CommentItem);
