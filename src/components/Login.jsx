import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import AuthService from '../services/authService'
import { Container, Form, Button, Alert } from 'react-bootstrap'

function Login() {
    const {onLogin} = useAuthDataContext()
    const history = useHistory()
    const service = new AuthService()
    const initialState = {
        username: '',
        password: '',
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
        if (!formData.username || !formData.password) {
            setFormData({
                ...formData,
                error: 'All the fields must be introduced'
            })
        } else {
            setFormData({
                ...formData,
                isSubmitting: true
            })
            const {username, password} = formData
            service.login(username, password)
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
    }
    return (
        <Container className='mt-4'>
            <h2>Log in</h2>
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
                <Form.Group controlId='formGridPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        name='password' 
                        value={formData.password} 
                        onChange={handleChange}
                        />
                </Form.Group>
                {
                    formData.error && <Alert variant='danger'>{formData.error}</Alert>
                }
                <Button className='but-teal' type='submit' disabled={formData.isSubmitting} >
                    {
                        formData.isSubmitting ?
                        'Loading...' :
                        'Login'
                    }
                </Button>
            </Form>
        </Container>
    )
}

export default Login
