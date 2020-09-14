import React, { useEffect, useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import AuthService from '../services/authService'
import Loader from './Loader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import ReviewCard from './ReviewCard'

function UserInfo(props) {
    const service = new AuthService()
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
    return (
        <Container>
            {
                data.isLoading ? <Loader/> :
                <>
                    <div className='account-image'>
                        <img src={data.user.picture} alt="user pic"/>
                        {
                            true ?
                            <Button className='btn-danger'>Mail <MailOutlineIcon/></Button> :
                            <Modal>
                                {/* AÑADIR MODAL EMAIL */}
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
