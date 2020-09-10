import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <Container>
            <h1>404 - Page Not Found!</h1>
            <Link to='/'>Go Home</Link>
        </Container>
    )
}

export default NotFound
