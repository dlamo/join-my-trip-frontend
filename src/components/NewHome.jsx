import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import HomeService from '../services/homeService'

function NewHome() {
    const {user, onLogin} = useAuthDataContext()
    const service = new HomeService()
    const history = useHistory()
    const initialHomeData = {
        title: '',
        description: ''
    }
    const [home, setHome] = useState(initialHomeData)
    const handleChange = ({target}) => {
        const {name, value} = target
        setHome({
            ...home,
            [name]: value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        const {title, description} = home
        const owner = user._id
        service.create(title, description, owner)
        .then(response => {
            onLogin(response)
            history.push('/account')
        })
    }
    return (
        <div>
            <h1>Create your home!</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type='text'
                    name='title'
                    value={home.title}
                    onChange={handleChange}
                    />
                <label>Description</label>
                <input
                    type='textarea'
                    name='description'
                    value={home.description}
                    onChange={handleChange}
                    />
                <input type='submit' value='Create your home' />
            </form>
        </div>
    )
}

export default NewHome
