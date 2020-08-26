import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import HomeService from '../services/homeService'

function NewHome() {
    const {user, onLogin} = useAuthDataContext()
    const service = new HomeService()
    const history = useHistory()
    const initialHomeData = {
        title: '',
        description: '',
        picture: '',
        isSubmittingForm: false,
        isSubmittingImage: false
    }
    const [home, setHome] = useState(initialHomeData)
    const [imageFile, setImageFile] = useState(null)
    const handleChange = ({target}) => {
        const {name, value} = target
        setHome({
            ...home,
            [name]: value
        })
    }
    const handleFileChange = ({target}) => {
        setHome({
            ...home,
            isSubmittingImage: true
        })
        setImageFile(target.files[0])
    }
    useEffect(() => {
        const uploadImage = new FormData()
        uploadImage.append('picture', imageFile)
        service.upload(uploadImage)
        .then(response => {
            console.log(response)
            setHome(home => ({
                ...home,
                isSubmittingImage:false,
                picture: response
            }))
        })
    }, [imageFile])
    const handleSubmit = e => {
        e.preventDefault()
        const {title, description, picture} = home
        const owner = user._id
        service.create(title, description, picture, owner)
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
                {
                    !home.picture ?
                    home.isSubmittingImage ?
                    <p>Loading image...</p> :
                    <input
                        type='file'
                        name='picture'
                        onChange={handleFileChange}
                        /> :
                    <p>Your image has been uploaded!</p>
                }
                <button disabled={home.isSubmittingForm || !home.title || !home.description || !home.picture} >
                    {
                        home.isSubmittingForm ?
                        'Loading...' :
                        'Create your home'
                    }
                </button>
            </form>
        </div>
    )
}

export default NewHome
