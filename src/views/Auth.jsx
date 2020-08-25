import React from 'react'
import { Route } from 'react-router-dom'
import Signup from '../components/old/Signup'
import Login from '../components/old/Login'
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
            {/* <Switch> */}
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
            {/* </Switch> */}
        </div>
    )
}

export default Auth
