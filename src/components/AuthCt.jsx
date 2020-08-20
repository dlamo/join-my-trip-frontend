import React, { useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthService from '../services/authService'
import {
    initialState,
    authReducer,
    CHANGE_FORM,
    INIT_FORM
} from '../reducers/authReducer'
import Auth from '../views/Auth'

function AuthCt() {
    const [userFormData, dispatch] = useReducer(authReducer, initialState)
    const [loggedUser, setLoggedUser] = useState(null)
    const service = new AuthService()
    let history = useHistory()
    const handleChange = ({target}) => {
        const {name, value} = target
        dispatch({
            type: CHANGE_FORM,
            payload: {
                [name]: value
            }
        })
    }
    const handleSubmitLogin = e => {
        e.preventDefault()
        const {username, password} = userFormData
        service.login(username, password)
        .then(response => {
            getUser(response)
            history.push('/account')
            dispatch({
                type: INIT_FORM
            })
        })
    }
    const handleSubmitSignup = (e) => {
        e.preventDefault()
        const {username, password, email} = userFormData
        service.signup(username, password, email)
        .then(response => {
            getUser(response)
            history.push('/account')
            dispatch({
                type: INIT_FORM
            })
        })
    }
    const getUser = userObj => {
        setLoggedUser(userObj)
    }
    return (
        <Auth
            userFormData={userFormData}
            loggedUser={loggedUser}
            handleChange={handleChange}
            handleSubmitLogin={handleSubmitLogin}
            handleSubmitSignup={handleSubmitSignup}
            getUser={getUser}
        />
    )
}

export default AuthCt
