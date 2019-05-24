import React, { Component } from "react";

import { withFirebase } from "../Firebase";

class MemBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: []
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

  render() {
    const { memes } = this.state;
    {
      console.log(memes[2]);
    }
    return <div />;
  }
}

export default withFirebase(MemBrowser);
