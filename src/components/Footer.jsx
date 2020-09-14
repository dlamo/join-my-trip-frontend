import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

function Footer() {
    return (
        <div className='footer d-flex flex-column justify-content-center align-items-center'>
            <p>Join My Trip! No rights reserved.</p>
            <p>Designed &#38; Developed by David de Lamo <a rel="noopener noreferrer" target="_blank" href='http://www.linkedin.com/in/david-de-lamo-valverde'><LinkedInIcon/></a></p>
        </div>
    )
}

export default Footer
