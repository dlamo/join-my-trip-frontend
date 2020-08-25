export const initialState = {
    isAuthenticated: false,
    user: null
}

export const authReducerCtx = (state, {type, payload}) => {
    switch (type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(payload))
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }
        case 'SIGNUP':
            localStorage.setItem('user', JSON.stringify(payload))
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }
        case 'UPLOAD':
            localStorage.setItem('user', JSON.stringify(payload))
            console.log('uploading', payload)
            return {
                ...state,
                user: payload
            }
        case 'LOGOUT':
            localStorage.removeItem('user')
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}