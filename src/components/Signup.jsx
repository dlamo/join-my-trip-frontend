import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import AuthService from '../services/authService'
import { Container, Form, Button, Alert } from 'react-bootstrap'

function Signup() {
    const {onLogin} = useAuthDataContext()
    const history = useHistory()
    const service = new AuthService()
    const initialState = {
        username: '',
        password: '',
        email: '',
        isSubmitting: false,
        error: ''
    }
    const [formData, setFormData] = useState(initialState)
    const handleChange = ({target}) => {
        const {name, value} = target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        setFormData({
            ...formData,
            isSubmitting: true
        })
        const {username, password, email} = formData
        service.signup(username, password, email)
        .then(response => {
            onLogin(response)
            history.push('/account')
        })
        .catch(({response}) => {
            setFormData({
                ...formData,
                error: response.data.message
            })
        })
    }
    return (
        <Container className='mt-4'>
            <h2>Sign up</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formGridUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text' 
                        name='username' 
                        value={formData.username} 
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group controlId='formGridEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='text' 
                        name='email' 
                        value={formData.email} 
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group controlId='formGridPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='text' 
                        name='password' 
                        value={formData.password} 
                        onChange={handleChange}
                        />
                </Form.Group>
                {
                    formData.error && <Alert variant='danger'>{formData.error}</Alert>
                }
                <Button className='but-teal' type='submit' disabled={formData.isSubmitting || !formData.username || !formData.password || !formData.email} >
                    {
                        formData.isSubmitting ?
                        'Loading...' :
                        'Signup'
                    }
                </Button>
            </Form>
        </Container>
    )
}

export default Signup
