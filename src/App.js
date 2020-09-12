import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AuthDataProvider from './provider/authProvider'
import NavBar from './components/NavBar'
import Main from './components/Main'
import NewHome from './components/NewHome'
import HomeDetail from './components/HomeDetail'
import Login from './components/Login'
import Signup from './components/Signup'
import Account from './components/Account'
import PrivateRoute from './components/PrivateRoute'
import AccountEdit from './components/AccountEdit'
import PastTrips from './components/PastTrips'
import FilterHomes from './components/FilterHomes'
import NotFound from './components/NotFound'
import './App.css'

function App() {
  return (
    <AuthDataProvider>
      <>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/search' component={FilterHomes} />
          <PrivateRoute exact path='/account' component={Account} />
          <PrivateRoute exact path='/account/edit' component={AccountEdit} />
          <PrivateRoute exact path='/account/past-trips' component={PastTrips} />
          <PrivateRoute exact path='/home/new' component={NewHome} />
          <PrivateRoute exact path='/home/one/:id' component={HomeDetail} />
          <Route component={NotFound} />
        </Switch>
      </>
    </AuthDataProvider>
  )
}

export default App;
