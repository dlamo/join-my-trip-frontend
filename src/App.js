import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AuthDataProvider from './provider/authProvider'
import Main from './components/Main'
import NewHome from './components/NewHome'
import HomeDetail from './components/HomeDetail'
import Login from './components/Login'
import Signup from './components/Signup'
import AllHomes from './components/AllHomes'
import Account from './components/Account'
import PrivateRoute from './components/PrivateRoute'
import AccountEdit from './components/AccountEdit'
import './App.css'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <AuthDataProvider>
      <Container>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/homes' component={AllHomes} />
          <PrivateRoute exact path='/account' component={Account} />
          <PrivateRoute exact path='/account/edit' component={AccountEdit} />
          <PrivateRoute exact path='/home/new' component={NewHome} />
          <PrivateRoute exact path='/home/one/:id' component={HomeDetail} />
        </Switch>
      </Container>
    </AuthDataProvider>
  )
}

export default App;
