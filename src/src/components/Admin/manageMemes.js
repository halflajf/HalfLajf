import React, { Component } from "react";
import * as ROLES from "../../constants/roles";
import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import CreateMem from "./createMem";

class MemesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      memes: []
    };
  }

  componentDidMount() {
    this.onListenForMemes();
  }

  onListenForMemes() {
    this.setState({ loading: true });

    this.props.firebase
      .memes()

      .on("value", snapshot => {
        // convert messages list from snapshot
        const memObject = snapshot.val();

        if (memObject) {
          // convert messages list from snapshot
          const memesList = Object.keys(memObject).map(key => ({
            ...memObject[key],
            uid: key
          }));
          this.setState({ loading: false, memes: memesList });
        } else {
          this.setState({ memes: null, loading: false });
        }
        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this.props.firebase.memes().off();
  }

  onEditMem = (mem, url) => {
    const { uid, ...memSnapshot } = mem;

    this.props.firebase.mem(mem.uid).set({
      ...memSnapshot,
      url,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  onRemoveMem = uid => {
    this.props.firebase.mem(uid).remove();
  };

  render() {
    const { memes, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <CreateMem />
            {memes ? (
              <MemList
                authUser={authUser}
                memes={memes}
                onRemoveMem={this.onRemoveMem}
                onEditMem={this.onEditMem}
              />
            ) : (
              <div>There are no memes ...</div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MemList = ({ memes, onRemoveMem, onEditMem, authUser }) => (
  <ul>
    {memes.map(mem => (
      <MemItem
        key={mem.uid}
        mem={mem}
        onRemoveMem={onRemoveMem}
        onEditMem={onEditMem}
        authUser={authUser}
      />
    ))}
  </ul>
);

class MemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editUrlMode: false,
      editUrl: this.props.mem.url
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
            <strong>Title: {mem.title}</strong> <br />
            <img src={mem.url} alt="" />
          </span>
        )}
        {!authUser ? (
          <div />
        ) : (
          <span>
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
            <div />
          </span>
        )}
      </li>
    );
  }
}

withFirebase(MemItem);

export default withFirebase(MemesBase);
