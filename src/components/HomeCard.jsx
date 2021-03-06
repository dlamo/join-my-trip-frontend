import React from 'react'
import { Link } from 'react-router-dom'

function HomeCard({home, idx}) {
    return (
        <div className='d-flex w-100 justify-content-start mt-3 home-card'>
            <img className='w-25' src={home.pictures[0]} alt="home pic"/>
            <div className='pl-2'>
                <Link to={'/home/one/' + home._id}><h5>{idx && `${idx} .`} {home.title}</h5></Link>
                <p>{home.location.formatted_address}</p>
            </div>
        </div>
    )
}

export default HomeCard
