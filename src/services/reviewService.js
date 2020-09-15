import axios from 'axios'

class ReviewService {
    constructor() {
        let service = axios.create({
            baseURL: process.env.REACT_APP_API_URL + '/review',
            withCredentials: true
        })
        this.service = service
    }

    newReview = (review) => {
        return this.service.post('/', {review})
        .then(response => response.data)
    }
}

export default ReviewService