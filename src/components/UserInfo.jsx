import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { useAuthDataContext } from '../provider/authProvider'
import AuthService from '../services/authService'
import Loader from './Loader'
import ReviewCard from './ReviewCard'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import EmailIcon from '@material-ui/icons/Email'
import { useHistory } from 'react-router-dom'

function UserInfo(props) {
    const {user} = useAuthDataContext()
    const service = new AuthService()
    const history = useHistory()
    const initialState = {
        user: {},
        reviews: [],
        isLoading: true
    }
    const [data, setData] = useState(initialState)
    useEffect(() => {
        const {id} = props.match.params
        service.getUser(id)
        .then(response => {
            setData({
                ...response,
                isLoading: false
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getUserRate = () => {
        return data.reviews.reduce((acc, r) => acc + r.valoration, 0)/(data.reviews.length)
    }
    const getReviews = () => {
        return data.reviews.map((rev, i) => <ReviewCard key={i} review={rev} />)
    }
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () => setShowModal(!showModal)
    const [message, setMessage] = useState('')
    const handleMessage = ({target}) => setMessage(target.value)
    const handleSubmitMessage = e => {
        e.preventDefault()
        const emailData = {
            host: data.user.username,
            user: user.username,
            message: message,
            guestEmail: user.email,
            hostEmail: data.user.email
        }
        service.sendMessage(emailData)
        .then(response => {
            history.push('/account')
        })
    }
    return (
        <Container>
            {
                data.isLoading ? <Loader/> :
                <>
                    <div className='account-image'>
                        <img src={data.user.picture} alt="user pic"/>
                        {
                            !showModal ?
                            <Button onClick={handleShowModal} className='btn-danger'>Mail <MailOutlineIcon/></Button> :
                            <Modal 
                                show={showModal}
                                onHide={handleShowModal}>
                                <Modal.Header>
                                    <Modal.Title>Ask the user a question</Modal.Title>
                                </Modal.Header>
                                <Form onSubmit={handleSubmitMessage}>
                                    <Modal.Body>
                                        Type your question:
                                        <Form.Control
                                            type='textarea'
                                            name='message'
                                            onChange={handleMessage}
                                            />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className='but-teal' type='submit'><EmailIcon/></Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        }
                    </div>
                </>
            }
            <h3>User info</h3><br/>
            {
                !data.user.isCompleted ? 
                <>
                    <p>{data.user.username} hasn't provided more data</p>
                </> :
                <>
                    <h6>Name: <b>{data.user.name}</b></h6>
                    <h6>Country: <b>{data.user.country}</b></h6>
                    <h6>Languages: <b>{data.user.languages}</b></h6>
                </>
            }
            <br/><h3>Reviews</h3>
            {
                data.reviews.length ?
                <>
                    <h6>User rate: <b>{getUserRate()} / 5</b></h6>
                    {getReviews()}
                </> :
                <h6>{data.user.username} has not been rated</h6>
            }
        </Container>
    )
}

export default UserInfo
