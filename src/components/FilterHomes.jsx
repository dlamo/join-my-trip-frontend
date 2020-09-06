import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import { getDates } from '../tools'
import { Button, Form, Container, InputGroup } from 'react-bootstrap'
import HomeService from '../services/homeService'
import HomeCard from './HomeCard'
import { useEffect } from 'react'
import Map from './Map'
const queryString = require('query-string')

function FilterHomes(props) {
    const service = new HomeService()
    // QUIZÁ PONER 2 USESTATE PARA CITY Y DATES
    const {city} = queryString.parse(props.location.search)
    const {dates: selectedDates} = props.location.state
    useEffect(() => {
        service.searchHomes(city, selectedDates)
        .then(response => {
            // AÑADIR IF EN CASO DE QUE NO SE OBTENGA NINGÚN RESULTADO
            setHomes(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    /* LIMIT CASE: NO HOMES RETURNED */
    const [search, setSearch] = useState('')
    const handleChangeSearch = ({target}) => setSearch(target.value)
    const handleSubmitCity = e => {
        e.preventDefault()
        service.searchHomes(search, selectedDates)
        .then(response => {
            // AÑADIR IF EN CASO DE QUE NO SE OBTENGA NINGÚN RESULTADO
            setHomes(response)
        })
    }
    /* SELECT DATES BUTTON */
    const [showCalendar, setShowCalendar] = useState(false)
    const handleShowCalendar = () => setShowCalendar(!showCalendar)
    /* CALENDAR SETTINGS */
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    const [dates, setDates] = useState([selectionRange])
    const handleSelectDates = ranges => {
        setDates([ranges.selection])
    }
    const handleSubmitDates = e => {
        e.preventDefault()
        const savedDates = [[dates[0].startDate.toISOString(), dates[0].endDate.toISOString()]]
        const parsedDates = getDates(savedDates).flat()
        service.searchHomes(city, parsedDates)
        .then(response => {
            setHomes(response)
            setShowCalendar(false)
        })
    }
    /* HOME SETTINGS */
    const [homes, setHomes] = useState([])
    /* MAP SETTINGS */
    const [showMap, setShowMap] = useState(false)
    const handleShowMap = () => setShowMap(!showMap)
    return (
        <Container>
            <h2>Homes</h2>
            {
                !showCalendar ?
                <Button onClick={handleShowCalendar}>Filter by dates</Button>:
                <>
                    <Button onClick={handleShowCalendar}>Hide calendar</Button>
                    <DateRange
                        editableDateInputs={true}
                        showDateDisplay={false}
                        onChange={handleSelectDates}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        />
                    <Form onSubmit={handleSubmitDates}>
                        <Button type='submit'>Change dates!</Button>
                    </Form>
                </>
            }
            {
                homes.length > 0 ? 
                    <Button 
                        className='ml-1' 
                        variant='success'
                        onClick={handleShowMap}
                        >Show results in a map</Button> :
                    <>
                        <p>Ups! There're no homes available in these dates</p>
                        <p>You should try another city or dates</p>
                        <Form onSubmit={handleSubmitCity}>
                            <Form.Group>
                                <InputGroup>
                                    <Form.Control
                                        type='text'
                                        name='search'
                                        value={search}
                                        onChange={handleChangeSearch}
                                        />
                                </InputGroup>
                            </Form.Group>
                            <Button type='submit'>Find Homes at a new city!</Button>
                        </Form>
                    </>
            }
            {
                homes.map(home => <HomeCard key={home._id} home={home} />)
            }
            {
                showMap &&
                // Cambiar estilos
                <div className='map-home'>
                    <Map homes={homes} position='relative' />
                </div>
            }
        </Container>
    )
}

export default FilterHomes
