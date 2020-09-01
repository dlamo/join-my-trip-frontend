import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import HomeService from '../services/homeService'
import { Container, Carousel, Form, Button } from 'react-bootstrap'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import GoogleMapReact from 'google-map-react'
import { getDates } from '../tools'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

function HomeDetail(props) {
    const service = new HomeService()
    const {onLogin} = useAuthDataContext()
    const history = useHistory()
    const initialState = {
        home: {},
        disabledDates: [],
        isLoading: true
    }
    const [state, setState] = useState(initialState)
    useEffect(() => {
        const {id} = props.match.params
        service.getOneHome(id)
        .then(response => {
            const {savedDates} = response
            const disabledDates = getDates(savedDates).flat()
            setState({
                ...state,
                isLoading: false,
                home: response,
                disabledDates
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Map settings
    const getMapOptions = (maps) => {
        return {
            disableDefaultUI: false,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [{ featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }] }],
        }
    }
    // Calendar settings
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    const [dates, setDates] = useState([selectionRange])
    const handleSelect = ranges => {
        setDates([ranges.selection])
    }
    const handleSubmitDates = e => {
        e.preventDefault()
        const savedDates = [dates[0].startDate, dates[0].endDate]
        const id = state.home._id
        service.saveDates(savedDates, id)
        .then((response) => {
            onLogin(response)
            history.push('/account')
        })
    }
    return (
        <Container>
            {
                state.isLoading ?
                <p>Loading home...</p> :
                <>
                    <Carousel className='my-4'>
                        {
                            state.home.pictures.map((pic, i) =>
                                <Carousel.Item key={i}>
                                    <img
                                        className='d-block w-100'
                                        src={pic}
                                        alt={`Slide ${i+1}`} />
                                </Carousel.Item>
                            )
                        }
                    </Carousel>
                    <h2>{state.home.title}</h2>
                    <p><LocationOnIcon/>{state.home.location.formatted_address}</p>
                    <p>{state.home.description}</p>
                    <h4>Conditions</h4>
                    <ul>
                        {state.home.conditions.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                    <h4>Location</h4>
                    <GoogleMapReact 
                        // bootstrapURLKeys={{key: ''}}
                        defaultCenter={state.home.location.geometry.location}
                        defaultZoom={15} 
                        options={getMapOptions}
                        // style={{width: '100%'}}
                        />
                    <h4>Save your dates!</h4>
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        disabledDates={state.disabledDates}
                        />
                    <Form onSubmit={handleSubmitDates}>
                        <Button type='submit'>Save dates!</Button>
                    </Form>
                </>
            }
        </Container>
    )
}

export default HomeDetail
