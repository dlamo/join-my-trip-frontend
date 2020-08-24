import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import AuthCt from './components/AuthCt'
import NewHome from './components/NewHome';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null)
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/home/one/:id' render={props => <Home {...props} user={user} />} />
        <Route exact path='/home/new' render={() => <NewHome user={user} />} />
        <AuthCt user={user} setUser={setUser} />
      </Switch>
    </div>
  );
}

export default App;
