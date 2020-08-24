import React from 'react'
import { Link } from 'react-router-dom'

function Main() {
    return (
        <div>
            <h1>Join my trip</h1>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
        </div>
    )
}

export default Main
