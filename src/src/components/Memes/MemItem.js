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
  onToggleeditUrlMode = () => {
    this.setState(state => ({
      editUrlMode: !state.editUrlMode,
      editUrl: this.props.mem.url
    }));
  };

  onChangeeditUrl = event => {
    this.setState({ editUrl: event.target.value });
  };

  onSaveeditUrl = () => {
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
    const dupa = mem.comments;
    const memUid = this.props.mem.uid;
    return (
      <li>
        {editUrlMode ? (
          <input type="text" value={editUrl} onChange={this.onChangeeditUrl} />
        ) : (
          <span>
            {console.log(mem)}
            <strong>{mem.userId}</strong> <img src={mem.url} />
            {mem.editedAt && <span>(Edited)</span>}
          </span>
        )}
        {authUser.uid === mem.userId && (
          <span>
            {editUrlMode ? (
              <span>
                <button onClick={this.onSaveeditUrl}>Save</button>
                <button onClick={this.onToggleeditUrlMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleeditUrlMode}>Edit</button>
            )}
            {!editUrlMode && (
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

export default MemItem;
