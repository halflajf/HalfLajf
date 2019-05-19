import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Main from './components/main/Main'
import MemeDetails from './components/memes/MemeDetails'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/meme/:id' component={MemeDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;