import React, { Component } from "react";

class MemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.mem.url
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

  render() {
    const { authUser, mem, onRemoveMem } = this.props;
    const { editMode, editText } = this.state;

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
            <strong>{mem.userId}</strong> {mem.url}
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
      </li>
    );
  }
}

export default MemItem;
