import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import Memes from "./Memes";

class MemBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: [],
      searchValue: "",
      loading: false
    };
  }

  componentDidMount() {
    this.onListenForMemes();
  }

  onListenForMemes() {
    this.setState({ loading: true });
    this.props.firebase.memes().on("value", snapshot => {
      const memObject = snapshot.val();

      if (memObject) {
        const memesList = Object.keys(memObject).map(key => ({
          ...memObject[key],
          uid: key
        }));
        this.setState({ memes: memesList, loading: false });
      } else {
        this.setState({ memes: null, loading: false });
      }
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.memes().off();
  }

  onSearchValue = event => {
    this.onListenForMemes();
    this.setState({ searchValue: event.target.value }, () =>
      this.getMemesByTag()
    );
  };

  getMemesByTag = () => {
    this.setState({
      memes: this.state.memes.filter(mem =>
        mem.tags.includes(this.state.searchValue)
      )
    });
  };

  getAllMemes = () => {
    this.onListenForMemes();
  };

  render() {
    const { memes, loading } = this.state;

    return (
      <div className="row col s12 m8 offset-m2">
        {" "}
        <br />
        <span>
          <center>
            {`Categories: `}
            <button onClick={this.onSearchValue} value="#janusz">
              #śmieszne
            </button>
            <button onClick={this.onSearchValue} value="#zwierze">
              #zwierze
            </button>
            <button onClick={this.onSearchValue} value="#maciek">
              #hobby
            </button>
            <button onClick={this.getAllMemes}>wszystkie</button>
          </center>
        </span>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <span>
            {memes.length ? (
              <Memes memes={memes} loading={loading} />
            ) : (
              <div>There are no memes ...</div>
            )}
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(MemBrowser);
