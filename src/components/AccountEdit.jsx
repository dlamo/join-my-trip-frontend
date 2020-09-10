import React, { useState } from 'react'
import { useAuthDataContext } from '../provider/authProvider'
import { useHistory } from 'react-router-dom'
import AuthService from '../services/authService'
import { Container, Form, Button } from 'react-bootstrap'

function AccountEdit() {
    const {onLogin} = useAuthDataContext()
    const history = useHistory()
    const service = new AuthService()
    const initialState = {
        name: '',
        country: '',
        languages: '',
        isSubmitting: false
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
        const {name, country, languages} = formData
        service.edit(name, country, languages)
        .then(response => {
            onLogin(response)
            history.push('/account')
        })
    }
    return (
        <Container className='mt-4'>
            <h2>Edit your personal data</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formGridName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        name='name' 
                        value={formData.name} 
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group controlId='formGridCountry'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                        type='text' 
                        name='country' 
                        value={formData.country} 
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group controlId='formGridLanguages'>
                    <Form.Label>Languages</Form.Label><br/>
                    <Form.Control 
                        type='text' 
                        name='languages' 
                        value={formData.languages} 
                        onChange={handleChange}
                        />
                    <Form.Text className='text-muted'>
                        Tipe all the languages you are comfortable talking
                    </Form.Text>
                </Form.Group>
                <Button className='but-teal' type='submit' disabled={formData.isSubmitting || !formData.name || !formData.country || !formData.languages} >
                    {
                        formData.isSubmitting ?
                        'Loading...' :
                        'Edit data'
                    }
                </Button>
            </Form>
        </Container>
    )
}

export default AccountEdit
