import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import TodayIcon from '@material-ui/icons/Today'
import EventIcon from '@material-ui/icons/Event'
import moment from 'moment'

function TripCard({trip}) {
    const {home, dates} = trip
    const getDatesTrip = dates => {
        const startDate = new Date(parseInt(dates[0]))
        const lastDate = new Date(parseInt(dates[dates.length - 1]))
        return [startDate, lastDate]
    }
    const parsedDates = getDatesTrip(dates)
    return (
        <Card>
            <Card.Img variant='top' src={home.pictures[0]} />
            <Card.Body>
                <Card.Title>
                    <p><Link to={'/home/one/' + home._id}>{home.title}</Link></p>
                    <p><TodayIcon/>{moment(parsedDates[0]).format('MMM Do')}</p>
                    <p><EventIcon/>{moment(parsedDates[1]).format('MMM Do')}</p>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default TripCard
