import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Main from './components/main/Main'
import MemeDetails from './components/memes/MemeDetails'
import RandomMeme from './components/memes/RandomMeme'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Profile from './components/user/Profile'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/meme/:id' component={MemeDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/profile' component={Profile} />
            <Route path='/randomMeme' component={RandomMeme} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;