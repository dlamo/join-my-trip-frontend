import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import HomeService from '../services/homeService'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
import { getDates } from '../tools'

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
        <div>
            {
                state.isLoading ?
                <p>Loading home...</p> :
                <>
                    <img style={{width: "100%"}} src={state.home.picture} alt="home pic"/>
                    <h1>{state.home.title}</h1>
                    <p>{state.home.description}</p>
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        disabledDates={state.disabledDates}
                        />
                    <form onSubmit={handleSubmitDates}>
                        <button type='submit'>Save dates!</button>
                    </form>
                </>
            }
        </div>
    )
}

export default HomeDetail
