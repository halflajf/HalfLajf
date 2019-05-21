import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.mem.comment
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
    const { editMode, editText } = this.state;
    const { mem, pentla, uid, authUser } = this.props;

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
        </li>
      </span>
    );
  }
}

export default withFirebase(CommentItem);
