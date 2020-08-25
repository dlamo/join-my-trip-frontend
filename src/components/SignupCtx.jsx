import React, { useState } from 'react'
import { useAuthDataContext } from '../provider/authProvider'
import { useHistory } from 'react-router-dom'
import AuthService from '../services/authService'

function SignupCtx() {
    const {onLogin} = useAuthDataContext()
    const history = useHistory()
    const service = new AuthService()
    const initialState = {
        username: '',
        password: '',
        email: '',
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
        const {username, password, email} = formData
        service.signup(username, password, email)
        .then(response => {
            onLogin(response)
            history.push('/account')
        })
    }
    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    type='text' 
                    name='username' 
                    value={formData.username} 
                    onChange={handleChange}
                    />
                <label>Email</label>
                <input 
                    type='text' 
                    name='email' 
                    value={formData.email} 
                    onChange={handleChange}
                    />
                <label>Password</label>
                <input 
                    type='text' 
                    name='password' 
                    value={formData.password} 
                    onChange={handleChange}
                    />
                <button disabled={formData.isSubmitting || !formData.username || !formData.password || !formData.email} >
                    {
                        formData.isSubmitting ?
                        'Loading...' :
                        'Signup'
                    }
                </button>
            </form>
        </div>
    )
}

export default SignupCtx
