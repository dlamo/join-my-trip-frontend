import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import { Container, Form, InputGroup, Col, FormControl, Button } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search'
import TodayIcon from '@material-ui/icons/Today'
import EventIcon from '@material-ui/icons/Event'
import { DateRange } from 'react-date-range'
import { getDates } from '../tools'

function Main() {
    const {user} = useAuthDataContext()
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
        <Container>
            {
                user ?
                <>
                    <Link to='/account'>My Account</Link><br/>
                    <Link to='/homes'>See all homes</Link>
                </> :
                <>
                    <Link to='/signup'>Signup</Link><br/>
                    <Link to='/login'>Login</Link><br/>
                    <Link to='/homes'>See all homes</Link>
                </>
            }
            <h1>Join my trip</h1>
            <Form>
                <Form.Group>
                    <Form.Row className='align-items-center'>
                        <Col xs={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><TodayIcon /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly onClick={handleClickDates} value={dates[0].startDate.toLocaleDateString()} />
                            </InputGroup>
                        </Col>
                        <Col xs={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><EventIcon /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly onClick={handleClickDates} value={dates[0].endDate.toLocaleDateString()} />
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
                            onChange={handleChangeSearch}
                            />
                        <InputGroup.Append>
                            <InputGroup.Text style={{backgroundColor: 'lightblue'}}>
                                <SearchIcon
                                    onClick={handleSubmitSearch}
                                    />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
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
    )
}

export default Main
