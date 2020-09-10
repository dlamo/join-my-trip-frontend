import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import AuthService from '../services/authService'
import HomeCard from './HomeCard'
import TripCard from './TripCard'
import { Container, Button, Modal, Form, Row, Col } from 'react-bootstrap'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

function Account() {
    const {user, onLogin} = useAuthDataContext()
    const service = new AuthService()
    /* IMAGE FILE UPLOAD */
    const [clicked, setClicked] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const handleClickEdit = () => setClicked(!clicked)
    const handleFileChange = ({target}) => setImageFile(target.files[0])
    const handleSubmitImage = e => {
        e.preventDefault()
        const uploadImage = new FormData()
        uploadImage.append('picture', imageFile)
        service.upload(uploadImage)
        .then(response => {
            setClicked(false)
            setImageFile(null)
            onLogin(response)
        })
    }
    const getTripCards = trips => {
        return trips.map((trip, i) => <Col key={i} xs={6}>
            <TripCard trip={trip} />
        </Col>)
    }
    return (
        <>
            <Container>
                <h2 className='mt-4'>Welcome, {user.username}</h2>
                <div className='account-image'>
                    <img src={user.picture} alt="user pic"/>
                    {
                        !clicked ?
                        <Button className='but-teal' onClick={handleClickEdit}><AddAPhotoIcon/></Button> :
                        <Modal 
                            show={clicked} 
                            dialogClassName='mt-5'
                            onHide={handleClickEdit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Upload new picture</Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={handleSubmitImage}>
                                <Modal.Body>
                                    <Form.Control
                                        type='file'
                                        name='image'
                                        onChange={handleFileChange}
                                        />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type='submit'>Send</Button>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                    }
                </div>
                <div className='account-info'>
                    <h3>User info</h3>
                    {
                        !user.isCompleted ? 
                        <div>
                            <p>Your profile is not completed,<br/>
                            complete it <Link to='/account/edit'>now!</Link></p>
                        </div> :
                        <div>
                            <h6>Name: <b>{user.name}</b></h6>
                            <h6>Country: <b>{user.country}</b></h6>
                            <h6>Languages: <b>{user.languages}</b></h6>
                        </div>
                    }
                </div>
            </Container>
            <Container>
                <h3>My Home</h3>
                {
                    user.home ?
                    <HomeCard home={user.home} />
                    :
                    <div>
                        <p>Start hosting people!</p>
                        <Link to='home/new'>Create your home</Link>
                    </div>
                }
            </Container>
            {
                user.trips &&
                <Container fluid>
                    <h3>My trips</h3>
                    <Row className='flex-nowrap overflow-auto'>
                        {getTripCards(user.trips)}
                    </Row>
                </Container>
            }
        </>
    )
}

export default Account
