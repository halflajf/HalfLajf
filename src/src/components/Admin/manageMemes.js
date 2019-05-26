import React, { Component } from "react";

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

  onEditMem = (mem, url, title, tags) => {
    const { uid, ...memSnapshot } = mem;

    this.props.firebase.mem(mem.uid).set({
      ...memSnapshot,
      url,
      title,
      tags,
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
      editUrl: this.props.mem.url,
      editTitle: this.props.mem.title,
      editTags: this.props.mem.tags.join(" ")
    };
  }
  onToggleEditUrlMode = () => {
    this.setState(state => ({
      editUrlMode: !state.editUrlMode,
      editUrl: this.props.mem.url,
      editTitle: this.props.mem.title
    }));
  };

  onChangeEditUrl = event => {
    this.setState({ editUrl: event.target.value });
  };

  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditTags = event => {
    this.setState({ editTags: event.target.value });
  };

  onSaveEditUrl = () => {
    this.props.onEditMem(
      this.props.mem,
      this.state.editUrl,
      this.state.editTitle,
      this.state.editTags.split(" ")
    );

    this.setState({ editUrlMode: false });
  };

  render() {
    const { mem, onRemoveMem } = this.props;
    const { editUrlMode, editUrl, editTitle, editTags } = this.state;

    return (
      <li>
        {editUrlMode ? (
          <span>
            <input
              type="text"
              value={editTitle}
              onChange={this.onChangeEditTitle}
            />{" "}
            <br />{" "}
            <input
              type="text"
              value={editUrl}
              onChange={this.onChangeEditUrl}
            />
            <br />{" "}
            <input
              type="text"
              value={editTags}
              onChange={this.onChangeEditTags}
            />
          </span>
        ) : (
          <span>
            <img src={mem.url} alt="" />
          </span>
        )}

        {editUrlMode ? (
          <div>
            <button onClick={this.onSaveEditUrl}>Save</button>
            <button onClick={this.onToggleEditUrlMode}>Return</button>
          </div>
        ) : (
          <span>
            <div>Title {mem.title}</div>
            <div>URL {mem.url}</div>
            <div>Tags {mem.tags}</div>
            <button onClick={this.onToggleEditUrlMode}>Edit</button>
          </span>
        )}
        {!editUrlMode && (
          <button type="button" onClick={() => onRemoveMem(mem.uid)}>
            Delete
          </button>
        )}

        <div />
      </li>
    );
  }
}

withFirebase(MemItem);

export default withFirebase(MemesBase);
