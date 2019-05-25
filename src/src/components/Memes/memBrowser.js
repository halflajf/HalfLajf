import React, { Component } from "react";

import { withFirebase } from "../Firebase";

class MemBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: [],
      searchValue: ""
    };
  }

  componentDidMount() {
    this.onListenForMemes();
  }

  onListenForMemes() {
    this.props.firebase.memes().on("value", snapshot => {
      // convert messages list from snapshot
      const memObject = snapshot.val();

      if (memObject) {
        // convert messages list from snapshot
        const memesList = Object.keys(memObject).map(key => ({
          ...memObject[key],
          uid: key
        }));
        this.setState({ memes: memesList });
      } else {
        this.setState({ memes: null });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.memes().off();
  }

  onSearchValue = event => {
    this.setState({ searchValue: event.target.value }, () =>
      this.getMemesByTag()
    );
    //console.log(this.state.searchValue + " val");
  };

  getMemesByTag = () => {
    const filterMemes = this.state.memes.filter(mem =>
      mem.tags.includes(this.state.searchValue)
    );

    console.log(filterMemes);
  };

  render() {
    return (
      <div>
        <button onClick={this.onSearchValue} value="#janusz">
          #janusz
        </button>
        <button onClick={this.onSearchValue} value="#zwierze">
          #zwierze
        </button>
        <button onClick={this.onSearchValue} value="#maciek">
          #maciek
        </button>
      </div>
    );
  }
}

export default withFirebase(MemBrowser);
