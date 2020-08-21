import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Account from '../components/Account'
import AccountEdit from '../components/AccountEdit'

function Auth({
    userFormData,
    loggedUser,
    handleChange,
    handleSubmitLogin,
    handleSubmitSignup,
    handleSubmitEdit,
    getUser
}) {
    return (
        <div>
            <Switch>
                <Route 
                    exact 
                    path='/' 
                    component={Home} 
                    />
                <Route 
                    path='/signup'
                    render={props => 
                        <Signup {...props} 
                            userFormData={userFormData} 
                            handleChange={handleChange} 
                            handleSubmitSignup={handleSubmitSignup}
                            />}
                    />
                <Route  
                    path='/login'
                    render={props => 
                        <Login {...props} 
                            userFormData={userFormData} 
                            handleChange={handleChange} 
                            handleSubmitLogin={handleSubmitLogin}
                            />}
                    />
                <Route
                    exact
                    path='/account'
                    render={props => 
                        <Account {...props} 
                            getUser={getUser} 
                            user={loggedUser} 
                            />} 
                    />
                <Route
                    path='/account/edit'
                    render={props => 
                        <AccountEdit {...props} 
                        userFormData={userFormData} 
                        handleChange={handleChange} 
                        handleSubmitEdit={handleSubmitEdit}
                            />} 
                    />
            </Switch>
        </div>
    )
}

export default Auth
