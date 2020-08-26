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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            {
                state.isLoading ?
                <p>Loading home...</p> :
                <>
                    <img style={{width: "100%"}} src={state.home.picture} alt="home pic"/>
                    <h1>{state.home.title}</h1>
                    <p>{state.home.description}</p>
                </>
            }
        </div>
    )
}

export default HomeDetail
