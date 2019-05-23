import React, { Component } from "react";

const API = "https://some-random-api.ml/meme";

class RandomMem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mem: {},
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.getRandomMem();
  }

  getRandomMem = () => {
    {
      console.log(this.state);
    }
    this.setState({ isLoading: true });

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => this.setState({ mem: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render() {
    const { mem, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <span>
        <img src={mem.url} alt={mem.text} />
        <br />
        <button onClick={this.getRandomMem}>Roll next!</button>
      </span>
    );
  }
}

export default RandomMem;
