import React from 'react'
import { Route } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import LoginCtx from './LoginCtx'

function PrivateRoute({component, ...options}) {
    const {user} = useAuthDataContext()
    const finalComponent = user ? component : LoginCtx
    return <Route {...options} component={finalComponent} />
}

export default PrivateRoute
