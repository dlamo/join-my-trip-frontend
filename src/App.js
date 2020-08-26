import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './components/Main'
import NewHome from './components/NewHome'
import HomeDetail from './components/HomeDetail'
import Login from './components/Login'
import AuthDataProvider from './provider/authProvider'
import Signup from './components/Signup'
import Account from './components/Account'
import PrivateRoute from './components/PrivateRoute'
import AccountEdit from './components/AccountEdit'
import './App.css'

function App() {
  return (
    <AuthDataProvider>
      <div>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <PrivateRoute exact path='/account' component={Account} />
          <PrivateRoute exact path='/account/edit' component={AccountEdit} />
          <PrivateRoute exact path='/home/new' component={NewHome} />
          <PrivateRoute exact path='/home/one/:id' component={HomeDetail} />
        </Switch>
      </div>
    </AuthDataProvider>
  )
}

export default App;
