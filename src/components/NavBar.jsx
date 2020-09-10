import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthDataContext } from '../provider/authProvider'
import AuthService from '../services/authService'
import Nav from 'react-bootstrap/esm/Nav'
import Navbar from 'react-bootstrap/esm/Navbar'
import NavLink from 'react-bootstrap/esm/NavLink'
// import NavbarBrand from 'react-bootstrap/esm/NavbarBrand'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import HomeIcon from '@material-ui/icons/Home'

function NavBar() {
    const {user, onLogout} = useAuthDataContext()
    const service = new AuthService()
    const history = useHistory()
    const handleLogout = () => {
        service.logout()
        .then(() => {
            history.push('/')
            onLogout()
        })
    }
    return (
        <Navbar collapseOnSelect expand='lg' variant='dark'>
            <NavbarToggle aria-controls="responsive-navbar-nav" />
            <NavbarCollapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                    {
                        !user?
                        <>
                            <NavLink eventKey='1' href='/signup'>Signup</NavLink>
                            <NavLink eventKey='2' href='/login'>Login</NavLink>
                            <NavLink eventKey='3' href='/#main-form'>Find a home</NavLink>
                        </> :
                        <>
                            <NavLink eventKey='1' href='/account'>My Profile</NavLink>
                            <NavLink eventKey='2' href='/#main-form'>Find a home</NavLink>
                            <NavLink eventKey='3' onClick={handleLogout}>Logout</NavLink>
                        </>
                    }
                </Nav>
            </NavbarCollapse>
            <HomeIcon onClick={() => history.push('/')} />
        </Navbar>
    )
}

export default NavBar
