import React, { useState, useEffect } from 'react'
import HomeService from '../services/homeService'
import HomeCard from './HomeCard'

function AllHomes() {
    const service = new HomeService()
    const initialState = {
        homes: {},
        isLoading: true
    }
    const [homes, setHomes] = useState(initialState)
    useEffect(() => {
        service.getAllHomes()
        .then(response => {
            setHomes({
                ...homes,
                isLoading: false,
                homes: response
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
           {
                // Quizá sería buena idea en vez de hacerlo como una card, hacerlo como una Media List de Bootstrap
               homes.isLoading ?
               <p>Loading homes...</p> :
               <div>
                   <h2>See all the homes available</h2>
                   {
                       homes.homes.map(home => <HomeCard key={home._id} home={home} />)
                   }
               </div>
           } 
        </>
    )
}

export default AllHomes
