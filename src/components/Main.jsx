import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'

function Main() {
    const {user} = useAuthDataContext()
    if (user) {
        return (
            <div>
                <h1>Hello, {user.username}!</h1>
                <Link to='/account'>My Account</Link><br/>
                <Link to='/homes'>See all homes</Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Join my trip</h1>
                <Link to='/signup'>Signup</Link><br/>
                <Link to='/login'>Login</Link><br/>
                <Link to='/homes'>See all homes</Link>
            </div>
        )
    }
}

export default Main
