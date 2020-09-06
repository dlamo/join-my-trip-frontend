import React, { createContext, useState, useEffect, useMemo, useContext } from 'react'
import AuthService from '../services/authService'

export const AuthDataContext = createContext(null)

const initialAuthData = {
    // isAuthenticated: false,
    user: null
}

const AuthDataProvider = props => {
    const [authData, setAuthData] = useState(initialAuthData)
    const service = new AuthService()
    
    useEffect(() => {
        // Get the user from localStorage and set it if exists
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser) {
            setAuthData({user: currentUser})
        } else {
            // In case there is no user in localStorage, check the server if there is an open session
            service.loggedin()
            .then((response) => {
                if (response._id) {
                    setAuthData({user: response})
                    localStorage.setItem('user', JSON.stringify(response))
                }
            })
            .catch((err) => console.log(err))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLogout = () => {
        localStorage.removeItem('user')
        setAuthData(initialAuthData)
    }

    const onLogin = newAuthData => {
        localStorage.setItem('user', JSON.stringify(newAuthData))
        setAuthData({user: newAuthData})
    }

    const authDataValue = useMemo(() => ({...authData, onLogin, onLogout}), [authData])

    return <AuthDataContext.Provider value={authDataValue} {...props} />
}

export const useAuthDataContext = () => useContext(AuthDataContext)

export default AuthDataProvider
