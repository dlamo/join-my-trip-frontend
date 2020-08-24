import axios from 'axios'

class HomeService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api/home',
            withCredentials: true
        })
        this.service = service;
    }

    create = (title, description, owner) => {
        return this.service.post('/', {title, description, owner})
        .then(response => response.data)
    }

    getAllHomes = () => {
        return this.service.get('/', {})
        .then(response => response.data)
    }

    getOneHome = (id) => {
        return this.service.get('/' + id, {})
        .then(response => response.data)
    }
}

export default HomeService