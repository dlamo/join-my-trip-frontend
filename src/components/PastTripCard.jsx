import React, { useState } from 'react'
import { getDatesTrip, formatDate } from '../tools'
import { Alert, Button, Card, Form, Modal } from 'react-bootstrap'
import ReviewService from '../services/reviewService'
import { useAuthDataContext } from '../provider/authProvider'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'

function PastTripCard({trip}) {
    const {home, dates, isReviewed, _id: tripId} = trip
    const {user, onLogin} = useAuthDataContext()
    const service = new ReviewService()
    const tripDates = getDatesTrip(dates).map(date => formatDate(date))
    /* MODAL SETTINGS */
    const [showModal, setShowModal] = useState(false)
    const handleModal = () => setShowModal(!showModal)
    /* FORM SETTINGS */
    const initialState = {
        title: '',
        comment: '',
        valoration: null,
        isSubmitting: false
    }
    const [formData, setFormData] = useState(initialState)
    const [showError, setShowError] = useState(false)
    const handleFormChange = ({target}) => {
        const {name, value} = target
        if(showError) setShowError(false)
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault()
        if (!formData.title || !formData.comment || !formData.valoration) {
            setShowError(true)
        } else {
            const newReview = {
                home: home._id,
                host: home.owner,
                reviewer: user._id,
                trip: tripId,
                valoration: formData.valoration,
                title: formData.title,
                comment: formData.comment
            }
            service.newReview(newReview)
            .then(response => {
                onLogin(response)
                console.log(response)
            })
        }
    }
    return (
        <Card>
            <Card.Img variant='top' src={home.pictures[0]}/>
            <Card.Body>
                <Card.Title>{home.title}</Card.Title>
                <Card.Text>From: {tripDates[0]} to: {tripDates[1]}</Card.Text>
                {
                    !isReviewed ?
                    !showModal ?
                    <Button className='but-teal' onClick={handleModal}>Add Review</Button> :
                        <Modal
                            show={showModal}
                            onHide={handleModal} >
                            <Modal.Header closeButton>
                                <Modal.Title>Tell your experience</Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={handleFormSubmit}>
                                <Modal.Body>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='title'
                                        onChange={handleFormChange} />
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        type='textarea'
                                        name='comment'
                                        onChange={handleFormChange} />
                                    <Form.Label>Rate your experience</Form.Label>
                                    <Form.Control
                                        type='number'
                                        name='valoration'
                                        min={0}
                                        max={5}
                                        onChange={handleFormChange} />
                                        <Form.Text className='text-muted'>
                                            Type a number from 0 to 5
                                        </Form.Text>
                                        <br/>
                                    <Alert show={showError} variant='danger'>Complete all the fields!</Alert>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type='submit' className='but-teal'>Submit</Button>
                                </Modal.Footer>
                            </Form> 
                        </Modal>
                    :
                    <p>Thanks for your review! <InsertEmoticonIcon/></p>
                }
            </Card.Body>
        </Card>
    )
}

export default PastTripCard
