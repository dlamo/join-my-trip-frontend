import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useAuthDataContext } from '../provider/authProvider'
import Loader from './Loader'
import PastTripCard from './PastTripCard'

function PastTrips() {
    const {user} = useAuthDataContext()
    const [isLoaded, setIsLoaded] = useState(false)
    const [pastTrips, setPastTrips] = useState([])
    useEffect(() => {
        const currentTime = new Date()
        const parsedToday = Date.parse(currentTime)
        const getPastTrips = user.trips
            .filter(trip => parseInt(trip.dates[trip.dates.length - 1]) < parsedToday)
            .sort((a, b) => parseInt(a.dates[0]) - parseInt(b.dates[0]))
        setPastTrips(getPastTrips)
        setIsLoaded(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getPastTripCards = (trips) => {
        return trips.map((trip, i) => <PastTripCard key={i} trip={trip} />)
    }
    return (
        <>
            {
                !isLoaded ?
                <Loader /> :
                <Container>
                    {
                        getPastTripCards(pastTrips)
                    }
                </Container>
            }
        </>
    )
}

export default PastTrips
