import React, { Component } from "react";
import CommentList from "./CommentList";
import * as ROLES from "../../constants/roles";

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
            <strong>
              Created by: {mem.username || mem.userId} <br />
              Title: {mem.title}
              {!mem.editedAt ? (
                <div>
                  Created At:{" "}
                  {new Date(mem.createdAt).toLocaleTimeString("en-US")}{" "}
                  {new Date(mem.createdAt).toLocaleDateString("en-US")}
                </div>
              ) : (
                <div>
                  Edited At:{" "}
                  {new Date(mem.editedAt).toLocaleTimeString("en-US")}{" "}
                  {new Date(mem.editedAt).toLocaleDateString("en-US")}
                </div>
              )}
            </strong>{" "}
            <br />
            <img src={mem.url} alt="" />
          </span>
        )}
        {!authUser ? (
          <span />
        ) : (
          <span>
            {authUser.uid === mem.userId ||
              (authUser.roles.includes(ROLES.ADMIN) && (
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
                </span>
              ))}
          </span>
        )}
        {mem.comments ? (
          <div>
            {" "}
            Comments:
            <CommentList
              comments={mem.comments}
              MemUid={mem.uid}
              authUser={authUser}
            />
          </div>
        ) : (
          <div>There are no comments ...</div>
        )}
        {!authUser ? (
          <span />
        ) : (
          <span>
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
