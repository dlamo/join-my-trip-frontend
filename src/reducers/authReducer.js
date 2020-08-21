export const CHANGE_FORM = 'CHANGE_FORM'
export const INIT_FORM = 'INIT_FORM'

export const initialState = {
    username: '',
    password: '',
    email: '',
    name: '',
    country: '',
    languages: ''
}

export const authReducer = (state, { type, payload }) => {
    switch(type) {
        case CHANGE_FORM:
            return {
                ...state,
                ...payload
            }
        case INIT_FORM:
            return {
                ...initialState
            }
        default:
            return state
    }
}