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
      <div className="comment">
        <div className="row">
          <div class="col s3">
              <span style={{fontSize: 14}}>
                Created by <b>{comment.username || comment.userId}</b><br/>
                {!comment.editedAt ? (
                  <div style={{fontSize: 11}}>
                    Created At:{" "}
                    {new Date(comment.createdAt).toLocaleTimeString("en-US")}{" "}
                    {new Date(comment.createdAt).toLocaleDateString("en-US")}
                  </div>
                ) : (
                  <div style={{fontSize: 11}}>
                    Edited At:{" "}
                    {new Date(comment.editedAt).toLocaleTimeString("en-US")}{" "}
                    {new Date(comment.editedAt).toLocaleDateString("en-US")}
                  </div>
                )}
              </span>
          </div>
          <div className="col s9">
            {comment.comment}
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            {CommentEditMode &&
              <div className="input-field">
                <i className="material-icons prefix">border_color</i>
                <input type="text" id="commentEditor" value={editComment} onChange={this.onChangeeditComment}/>
                <label class="active" htmlFor="commentEditor">
                  Edytuj komentarz:
                </label>
              </div>
            }
          </div>
        </div>
        <div className="row right-align">
        {!authUser ? (
          <span />
        ) : (
          <span>
            {authUser.roles.includes(ROLES.ADMIN) && (
              <span>
                {CommentEditMode ? (
                  <span>
                    <button onClick={() => this.onEditMessage(MemUid, comment, editComment, index)} className="btn-small orange darken-2 z-depth-1">
                      Save
                    </button>
                    <button onClick={this.onToggleCommentEditMode} className="btn-small orange darken-2 z-depth-1">
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button onClick={this.onToggleCommentEditMode} className="btn-small orange darken-2 z-depth-1">Edit</button>
                )}

                {!CommentEditMode && (
                  <button onClick={() => this.onRemoveComment(MemUid, index)} className="btn-small orange darken-2 z-depth-1">
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
                      <button onClick={() => this.onEditMessage(MemUid, comment, editComment, index)} className="btn-small orange darken-2 z-depth-1">
                        Save
                      </button>
                      <button onClick={this.onToggleCommentEditMode} className="btn-small orange darken-2 z-depth-1">
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button onClick={this.onToggleCommentEditMode} className="btn-small orange darken-2 z-depth-1">Edit</button>
                  )}
                  {!CommentEditMode && (
                    <button onClick={() => this.onRemoveComment(MemUid, index)} className="btn-small orange darken-2 z-depth-1">
                      Delete comment
                    </button>
                  )}
                </span>
              )}
          </span>
        )}
        </div>
      </div>
    );
  }
}

export default withFirebase(CommentItem);