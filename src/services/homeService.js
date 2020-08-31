import axios from 'axios'

class HomeService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api/home',
            withCredentials: true
        })
        this.service = service;
    }

    create = (title, description, pictures, conditions, owner) => {
        return this.service.post('/', {title, description, pictures, conditions, owner})
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
    upload = picture => {
        return this.service.post('/upload', picture)
        .then(response => response.data)
    }
    saveDates = (savedDates, id) => {
        return this.service.put(`/save-dates/${id}`, savedDates)
        .then(response => response.data)
    }
    findLocation = (location) => {
        return this.service.get('/location?search=' + location)
        .then(response => response.data)
    }
}

export default HomeService