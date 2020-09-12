import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import { getDates } from '../tools'
import Loader from './Loader'
import { Container, Form, InputGroup, Col, FormControl, Button } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search'
import TodayIcon from '@material-ui/icons/Today'
import EventIcon from '@material-ui/icons/Event'

function Main() {
    const history = useHistory()
    const [search, setSearch] = useState('')
    const handleChangeSearch = ({target}) => setSearch(target.value)
    const handleSubmitSearch = () => {
        const savedDates = [[dates[0].startDate.toISOString(), dates[0].endDate.toISOString()]]
        const parsedDates = getDates(savedDates).flat()
        history.push('/search?city=' + search, {dates: parsedDates})
    }
    /* CALENDAR SETTINGS */
    const [showCalendar, setShowCalendar] = useState(false)
    const handleClickDates = () => setShowCalendar(true)
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    const [dates, setDates] = useState([selectionRange])
    const handleSelectDates = ranges => {
        setDates([ranges.selection])
    }
    const handleConfirmDates = () => {
        setShowCalendar(false)
    }
    return (
        <>
            <Container fluid className='main-banner'>
                <h1>Join my trip</h1>
            </Container>
            <Container className='main-form' id='main-form'>
                <h3>Start looking for your next destination:</h3>
                <Form>
                    <Form.Group>
                        <Form.Row className='align-items-center'>
                            <Col xs={6}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><TodayIcon /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl 
                                        readOnly 
                                        onClick={handleClickDates} 
                                        value={dates[0].startDate.toLocaleDateString()} 
                                        />
                                </InputGroup>
                            </Col>
                            <Col xs={6}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><EventIcon /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl 
                                        readOnly 
                                        onClick={handleClickDates} 
                                        value={dates[0].endDate.toLocaleDateString()} 
                                        />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control 
                                type='text'
                                name='search'
                                value={search}
                                placeholder='Type your dreamed destination'
                                onChange={handleChangeSearch}
                                />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <SearchIcon onClick={handleSubmitSearch}/>
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <Form.Text className='text-muted'>
                            Just select dates, type a city and click on the icon!
                        </Form.Text>
                    </Form.Group>
                    {
                        showCalendar &&
                        <>
                            <DateRange
                                onChange={handleSelectDates}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                showDateDisplay={false}
                                />
                            <Button onClick={handleConfirmDates}>Confirm dates</Button>
                        </>
                    }
                </Form>
            </Container>
            <Loader />
        </>
    )
}

export default Main
