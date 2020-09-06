import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import AuthService from '../services/authService'
import moment from 'moment'

function Account() {
    const {user, onLogin, onLogout} = useAuthDataContext()
    const service = new AuthService()
    const history = useHistory()
    const [clicked, setClicked] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const handleClickEdit = () => setClicked(true)
    const handleFileChange = ({target}) => setImageFile(target.files[0])
    const handleSubmitImage = e => {
        e.preventDefault()
        const uploadImage = new FormData()
        uploadImage.append('picture', imageFile)
        service.upload(uploadImage)
        .then(response => {
            setClicked(false)
            setImageFile(null)
            onLogin(response)
        })
    }
    const handleLogout = () => {
        service.logout()
        .then(() => {
            history.push('/')
            onLogout()
        })
    }
    const getDatesTrip = (trips) => {
        return trips.map(trip => {
            const startDate = new Date(parseInt(trip.dates[0]))
            const lastDate = new Date(parseInt(trip.dates[trip.dates.length - 1]))
            return [startDate, lastDate]
        })
    }
    return (
        <div>
            <div>
                <h1>Welcome, {user.username}</h1>
                <img style={{width: "100%"}} src={user.picture} alt="user pic"/>
                {
                    !clicked ?
                    <button onClick={handleClickEdit}>Edit Photo</button> :
                    <form onSubmit={handleSubmitImage}>
                        <input type='file' name='image' onChange={handleFileChange}/>
                        <input className='btn' type='submit' value='Upload photo'/>
                    </form>
                }
                {
                    !user.isCompleted ? 
                    <div>
                        <p>Complete your profile now!</p>
                        <Link to='/account/edit'>Click here</Link>
                    </div> :
                    <div>
                        <h5><u>Name</u></h5>
                        <h4>{user.name}</h4>
                        <h5><u>Country</u></h5>
                        <h4>{user.country}</h4>
                        <h5><u>Languages</u></h5>
                        <h4>{user.languages}</h4>
                    </div>
                }
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div>
                <h2>My Home</h2>
                {
                    user.home ?
                    <div>
                        <Link to={'/home/one/' + user.home}>Visit</Link>
                    </div>
                    :
                    <div>
                        <p>Start hosting people!</p>
                        <Link to='home/new'>Create your home</Link>
                    </div>
                }
            </div>
            {
                user.trips &&
                <div>
                    <h2>My trips</h2>
                    <ul>
                        {
                            getDatesTrip(user.trips).map((trip, i) =>{
                                return <li key={i}>
                                    {/* LINK NO FUNCIONA, GETDATESTRIP SOLO RETORNA DATES CON LO QUE PIERDO HOME */}
                                    From <b>{moment(trip[0]).format('MMM Do')}</b> to <b>{moment(trip[1]).format('MMM Do')}</b> in this <Link to={'/home/one/' + trip.home}>house</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>  
            }
        </div>
    )
}

export default Account
