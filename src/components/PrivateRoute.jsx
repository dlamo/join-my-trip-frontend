import React from 'react'
import { Route } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import Login from './Login'

function PrivateRoute({component, ...options}) {
    const {user} = useAuthDataContext()
    const finalComponent = user ? component : Login
    return <Route {...options} component={finalComponent} />
}

export default PrivateRoute
