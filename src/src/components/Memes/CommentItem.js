import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import * as ROLES from "../../constants/roles";

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CommentEditMode: false,
      editComment: this.props.comment.comment
    };
  }
  onRemoveComment = (MemUid, index) => {
    this.props.firebase.comment(MemUid, index).set([]);
    //zrobic tak ze pobeirac cale i setowac bez elementu odnawaijac comments[]
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
      ...commentSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
      comment: message
    });

    this.setState({ CommentEditMode: false });
  };

  onChangeeditComment = event => {
    this.setState({ editComment: event.target.value });
  };

  render() {
    const { CommentEditMode, editComment } = this.state;
    const { comment, index, MemUid, authUser } = this.props;

    return (
      <li>
        {CommentEditMode ? (
          <input
            type="text"
            value={editComment}
            onChange={this.onChangeeditComment}
          />
        ) : (
          <span>
            Created by: {comment.username || comment.userId} <br />
            {comment.comment}
            {!comment.editedAt ? (
              <div>
                Created At:{" "}
                {new Date(comment.createdAt).toLocaleTimeString("en-US")}{" "}
                {new Date(comment.createdAt).toLocaleDateString("en-US")}
              </div>
            ) : (
              <div>
                Edited At:{" "}
                {new Date(comment.editedAt).toLocaleTimeString("en-US")}{" "}
                {new Date(comment.editedAt).toLocaleDateString("en-US")}
              </div>
            )}
          </span>
        )}
        {!authUser ? (
          <span />
        ) : (
          <span>
            {authUser.roles.includes(ROLES.ADMIN) && (
              <span>
                {CommentEditMode ? (
                  <span>
                    <button
                      onClick={() =>
                        this.onEditMessage(MemUid, comment, editComment, index)
                      }
                    >
                      Save
                    </button>
                    <button onClick={this.onToggleCommentEditMode}>
                      Cofnij
                    </button>
                  </span>
                ) : (
                  <button onClick={this.onToggleCommentEditMode}>Edit</button>
                )}

                {!CommentEditMode && (
                  <button onClick={() => this.onRemoveComment(MemUid, index)}>
                    Delete comment
                  </button>
                )}
              </span>
            )}
            {authUser.uid === comment.userId &&
              !authUser.roles.includes(ROLES.ADMIN) && (
                <span>
                  {CommentEditMode ? (
                    <span>
                      <button
                        onClick={() =>
                          this.onEditMessage(
                            MemUid,
                            comment,
                            editComment,
                            index
                          )
                        }
                      >
                        Save
                      </button>
                      <button onClick={this.onToggleCommentEditMode}>
                        Cofnij
                      </button>
                    </span>
                  ) : (
                    <button onClick={this.onToggleCommentEditMode}>Edit</button>
                  )}

                  {!CommentEditMode && (
                    <button onClick={() => this.onRemoveComment(MemUid, index)}>
                      Delete comment
                    </button>
                  )}
                </span>
              )}
          </span>
        )}
      </li>
    );
  }
}

export default withFirebase(CommentItem);
