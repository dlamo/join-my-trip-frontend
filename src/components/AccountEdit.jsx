import React, { useState } from 'react'
import { useAuthDataContext } from '../provider/authProvider'
import { useHistory } from 'react-router-dom'
import AuthService from '../services/authService'

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
        <div>
            <h1>Edit your personal data</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    />
                <label>Country</label>
                <input 
                    type="text" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange}
                    />
                <label>Languages</label>
                <input 
                    type="text" 
                    name="languages" 
                    value={formData.languages} 
                    onChange={handleChange}
                    />
                <button disabled={formData.isSubmitting || !formData.name || !formData.country || !formData.languages} >
                    {
                        formData.isSubmitting ?
                        'Loading...' :
                        'Edit data'
                    }
                </button>
            </form>
        </div>
    )
}

export default AccountEdit
