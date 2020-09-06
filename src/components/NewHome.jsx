import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import HomeService from '../services/homeService'
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import LocationOnIcon from '@material-ui/icons/LocationOn'

function NewHome() {
    const {user, onLogin} = useAuthDataContext()
    const service = new HomeService()
    const history = useHistory()

    /* MAIN STATE HANDLERS */
    const initialHomeData = {
        title: '',
        description: '',
        pictures: [],
        isSubmittingForm: false,
        isSubmittingImage: false,
        conditions: []
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
        const {title, description, pictures, conditions} = home
        const [homeLocation] = location.candidates
        const locationData = homeLocation.formatted_address.split(",")
        homeLocation.country = locationData[locationData.length - 1].trim()
        homeLocation.region = locationData[locationData.length - 2].trim()
        const owner = user._id
        service.create(title, description, pictures, conditions, homeLocation, owner)
        .then(response => {
            onLogin(response)
            history.push('/account')
        })
    }
    
    /* CONDITIONS HANDLERS */
    const [condition, setCondition] = useState('')
    const handleChangeCondition = ({target}) => setCondition(target.value)
    const handleAddCondition = () => {
        setHome({
            ...home,
            conditions: [...home.conditions, condition]
        })
        setCondition('')
    }
    const handleDeleteCond = (i) => {
        const newConditions = [...home.conditions]
        newConditions.splice(i,1)
        setHome({
            ...home,
            conditions: [...newConditions]
        })
    }
    
    /* LOCATION HANDLERS */
    const [location, setLocation] = useState({input: '', candidates: []})
    const handleChangeLocation = ({target}) => {
        setLocation({
            ...location, 
            input: target.value
        })
    }
    const handleSearchLocation = () => {
        service.findLocation(location.input)
        .then(response => {
            setLocation({
                ...location,
                candidates: response
            })
        })
    }
    
    /* FILE UPLOAD HANDLERS */
    const [imageFiles, setImageFiles] = useState([])
    const handleFileChange = ({target}) => {
        setHome({
            ...home,
            isSubmittingImage: true
        })
        setImageFiles({files: target.files})
    }
    useEffect(() => {
        if (imageFiles.files) {
            const uploadImage = new FormData()
            for (let i = 0; i < imageFiles.files.length; i++) {
                uploadImage.append(`picture`, imageFiles.files[i])
            }
            service.upload(uploadImage)
            .then(response => {
                setHome(home => ({
                    ...home,
                    isSubmittingImage:false,
                    pictures: response
                }))
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageFiles])

    return (
        <Container className='mt-4'>
            <h2>Create your home!</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formGridTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type='text' 
                        name='title' 
                        value={home.title} 
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group controlId='formGridDescription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        type='textarea' 
                        name='description' 
                        value={home.description} 
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Conditions</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            type='text'
                            name='condition'
                            value={condition}
                            onChange={handleChangeCondition}
                            />
                        <InputGroup.Append >
                            <InputGroup.Text onClick={handleAddCondition}><AddIcon/></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <ul>
                    {
                        home.conditions.map((cond, i) => 
                            <li key={i} onClick={() => handleDeleteCond(i)}>
                                {cond} <ClearIcon style={{color: 'red'}} />
                            </li>
                        )
                    }
                </ul>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type='text'
                            name='location'
                            value={location.input}
                            onChange={handleChangeLocation} 
                            />
                        <InputGroup.Append >
                            <InputGroup.Text onClick={handleSearchLocation}><SearchIcon/></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <Form.Text className='text-muted'>
                        Tipe the home adress (with/without number) and city and click the search icon
                    </Form.Text>
                    {location.candidates[0] && <p><LocationOnIcon/>Location has been set to: {location.candidates[0].formatted_address}</p>}
                </Form.Group>
                {
                    !home.pictures.length ?
                    home.isSubmittingImage ?
                    <p>Loading image...</p> :
                    <Form.Group controlId='formGridImage'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='file' 
                            multiple
                            name='pictures' 
                            onChange={handleFileChange}
                            />
                    </Form.Group> :
                    <p>Your image has been uploaded!</p>
                }<br/>
                <Button type='submit' disabled={home.isSubmittingForm || !home.title || !home.description || !home.pictures.length} >
                    {
                        home.isSubmittingForm ?
                        'Loading...' :
                        'Create your home'
                    }
                </Button>
            </Form>
        </Container>
    )
}

export default NewHome
