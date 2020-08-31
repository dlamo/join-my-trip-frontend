import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import HomeService from '../services/homeService'
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add'

function NewHome() {
    const {user, onLogin} = useAuthDataContext()
    const service = new HomeService()
    const history = useHistory()
    const initialHomeData = {
        title: '',
        description: '',
        pictures: [],
        isSubmittingForm: false,
        isSubmittingImage: false,
        conditions: []
    }
    const [home, setHome] = useState(initialHomeData)
    const [condition, setCondition] = useState('')
    const [imageFiles, setImageFiles] = useState([])
    const handleChange = ({target}) => {
        const {name, value} = target
        setHome({
            ...home,
            [name]: value
        })
    }
    const handleChangeCondition = ({target}) => setCondition(target.value)
    const handleAddCond = () => {
        setHome({
            ...home,
            conditions: [...home.conditions, condition]
        })
        setCondition('')
    }
    const handleDeleteCond = (props) => {
        // NO PUEDO ACCEDER A LA KEY
        console.log(props)
    }
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
    const handleSubmit = e => {
        e.preventDefault()
        const {title, description, pictures, conditions} = home
        const owner = user._id
        service.create(title, description, pictures, conditions, owner)
        .then(response => {
            onLogin(response)
            history.push('/account')
        })
    }
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
                            <InputGroup.Text onClick={handleAddCond}><AddIcon/></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <ul>
                    {
                        home.conditions.map((cond, i) => 
                            <li key={i} onClick={handleDeleteCond}>
                                {cond} <span style={{color: 'red'}}><u>Click to delete</u></span>
                            </li>
                        )
                    }
                </ul>
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
