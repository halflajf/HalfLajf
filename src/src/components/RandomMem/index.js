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
      <div className="container random-memes">
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <h3 className="center">Random Meme</h3>
          <p className="center">Bored at work? Than grab a random meme! Just remeber, if you like it, don't forget to save it - once it's gone, it's gone!</p>
          <div style={{textAlign: 'center', marginBottom: 15}}>
            <a className="btn orange darken-2 z-depth-1" onClick={this.getRandomMem}>Re-roll</a>
          </div>
          <div className="card z-depth-1 random-meme">
            <div className="card-image">
              <img src={mem.image} alt={mem.caption}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default RandomMem;
