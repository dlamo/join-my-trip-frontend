import React from 'react'
import { Link } from 'react-router-dom'

function HomeCard({home}) {
    return (
        <div>
            <Link to={'/home/one/' + home._id}><h3>{home.title}</h3></Link>
            <img style={{width: '40vw'}} src={home.picture} alt="home pic"/>
        </div>
    )
}

export default HomeCard
