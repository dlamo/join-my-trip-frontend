import React, { useState, useEffect } from 'react'
import HomeService from '../services/homeService'

function HomeDetail(props) {
    const service = new HomeService()
    const initialState = {
        home: {},
        isLoading: true
    }
    const [state, setState] = useState(initialState)
    useEffect(() => {
        const {id} = props.match.params
        service.getOneHome(id)
        .then(response => {
            setState({
                ...state,
                isLoading: false,
                home: response
            })
        })
    })
    return (
        <div>
            {
                state.isLoading ?
                <p>Loading home...</p> :
                <>
                    <h1>{state.home.title}</h1>
                    <p>{state.home.description}</p>
                </>
            }
        </div>
    )
}

export default HomeDetail
