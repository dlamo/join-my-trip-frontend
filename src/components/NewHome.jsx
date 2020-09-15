import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import HomeService from '../services/homeService'
import { Container, Form, Button, InputGroup, Alert, Modal } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { getLocationData } from '../tools'

function NewHome() {
    const {user, onLogin} = useAuthDataContext()
    const service = new HomeService()
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
    /* SUBMIT SETTINGS */
    const [showError, setShowError] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const handleSubmit = e => {
        e.preventDefault()
        if (!home.title || !home.description || !home.pictures.length || !location.candidates.length) {
            setShowError(true)
        } else {
            const {title, description, pictures, conditions} = home
            const homeLocation = getLocationData(location.candidates)
            const owner = user._id
            service.create(title, description, pictures, conditions, homeLocation, owner)
            .then(response => {
                onLogin(response)
                setShowModal(true)
            })
        }
    }
    return (
        <Container className='mt-4 view-min'>
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
                    <p><b>Your image has been uploaded!</b></p>
                }
                {
                    showError && <Alert variant='danger'>All fields must be completed</Alert>
                }
                <Button className='but-teal' type='submit' disabled={home.isSubmittingForm} >
                    {
                        home.isSubmittingForm ?
                        'Loading...' :
                        'Create your home'
                    }
                </Button>
            </Form>
            {
                showModal && 
                <Modal show={showModal}>
                    <Modal.Header>
                        <Modal.Title>Home created successfully!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>What do you want to do next?</Modal.Body>
                    <Modal.Footer>
                        <Link className='btn but-teal' to='/'>Look for a destination</Link>
                        <Link className='btn but-teal' to='/account'>Profile</Link>
                    </Modal.Footer>
                </Modal>
            }
        </Container>
    )
}

export default NewHome
