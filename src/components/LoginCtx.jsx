import React, { useState } from 'react'
import AuthService from '../services/authService'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'

function LoginCtx() {
    const {onLogin} = useAuthDataContext()
    const history = useHistory()
    const service = new AuthService()
    const initialState = {
        username: '',
        password: '',
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
        const {username, password} = formData
        service.login(username, password)
        .then(response => {
            onLogin(response)
            history.push('/account')
        })
    }
    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    />
                <label>Password</label>
                <input
                    type='text'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    />
                <button disabled={formData.isSubmitting || !formData.username || !formData.password} >
                    {
                        formData.isSubmitting ?
                        'Loading...' :
                        'Login'
                    }
                </button>
            </form>
        </div>
    )
}

export default LoginCtx
