import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'

function Main() {
    const {user} = useAuthDataContext()
    if (user) {
        return (
            <div>
                <h1>Hello, {user.username}!</h1>
                <Link to='/account'>My Account</Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Join my trip</h1>
                <Link to='/signup'>Signup</Link>
                <Link to='/login'>Login</Link>
            </div>
        )
    }
}

export default Main
