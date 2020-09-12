import React from 'react'
import { getDatesTrip, formatDate } from '../tools'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import TodayIcon from '@material-ui/icons/Today'
import EventIcon from '@material-ui/icons/Event'

function TripCard({trip}) {
    const {home, dates} = trip
    const tripDates = getDatesTrip(dates).map(date => formatDate(date))
    return (
        <Card className='trip-card'>
            <Card.Img variant='top' src={home.pictures[0]} />
            <Card.Body>
                <Card.Title>
                    <p><Link to={'/home/one/' + home._id}>{home.title}</Link></p>
                    <p><TodayIcon/>{tripDates[0]}</p>
                    <p><EventIcon/>{tripDates[1]}</p>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default TripCard
