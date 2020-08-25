import React, { createContext, useState, useEffect, useMemo, useContext } from 'react'

export const AuthDataContext = createContext(null)

const initialAuthData = {
    // isAuthenticated: false,
    user: null
}

const AuthDataProvider = props => {
    const [authData, setAuthData] = useState(initialAuthData)
    
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser) {
            setAuthData({user: currentUser})
        }
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
