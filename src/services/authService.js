import axios from 'axios'

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: process.env.REACT_APP_API_URL + '/auth',
            withCredentials: true
        })
        this.service = service;
    }
    
    signup = (username, password, email) => {
        return this.service.post('/signup', {username, password, email})
        .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
        .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('/login', {username, password})
        .then(response => response.data)
    }
    
    logout = () => {
        return this.service.post('/logout', {})
        .then(response => response.data)
    }

    edit = (name, country, languages) => {
        return this.service.put('/edit', {name, country, languages, isCompleted: true})
        .then(response => response.data)
    }

    upload = picture => {
        return this.service.post('/upload', picture)
        .then(response => response.data)
    }

    getUser = id => {
        return this.service.get('/user/' + id)
        .then(response => response.data)
    }
    sendMessage = (emailData) => {
        return this.service.post('/user-email', {emailData})
        .then(response => response.data)
    }
}

export default AuthService