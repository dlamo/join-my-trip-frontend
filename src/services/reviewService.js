import axios from 'axios'

class ReviewService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api/review',
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