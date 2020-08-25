import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './components/Main'
import NewHome from './components/NewHome'
import HomeDetail from './components/HomeDetail'
import LoginCtx from './components/LoginCtx'
import AuthDataProvider from './provider/authProvider'
import SignupCtx from './components/SignupCtx'
import AccountCtx from './components/AccountCtx'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

function App() {
  return (
    <AuthDataProvider>
      <div>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/login' component={LoginCtx} />
          <Route exact path='/signup' component={SignupCtx} />
          <PrivateRoute exact path='/account' component={AccountCtx} />
          <PrivateRoute exact path='/home/new' component={NewHome} />
          <Route exact path='/home/one/:id' component={HomeDetail} />
        </Switch>
      </div>
    </AuthDataProvider>
  )
}

export default App;
