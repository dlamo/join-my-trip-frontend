import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthService from '../services/authService'
import { AuthContext } from '../App';

function Account(props) {
    //Aquí empieza el cambio para context
    const {state: userState, dispatch} = useContext(AuthContext)
    const {user} = userState
    //
    const service = new AuthService()
    const history = useHistory()
    //Cambiado
    //const [user, setUser] = useState(newUser)
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
            dispatch({
                type: 'UPLOAD',
                payload: response
            })
            //setUser(response)
            //props.getUser(response)
        })
    }
    const handleLogout = () => {
        service.logout()
        .then(() => {
            history.push('/')
            dispatch({
                type: 'LOGOUT'
            })
            //props.getUser(null)
        })
    }
    return (
        <div>
            <div>
                <h1>Welcome to your profile, {user.username}</h1>
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
                        <h5>Name</h5>
                        <h4>{user.name}</h4>
                        <h5>Country</h5>
                        <h4>{user.country}</h4>
                        <h5>Languages</h5>
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
                        <p>Your home:</p> 
                        <Link to={'/home/one/' + user.home}></Link>
                    </div>
                    :
                    <div>
                        <p>Start hosting people!</p>
                        <Link to='home/new'>Create your home</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Account
