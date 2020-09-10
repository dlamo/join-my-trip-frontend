import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <div className='d-flex justify-content-center mt-4'>
            <Spinner animation='border' style={{color: 'teal'}} />
        </div>
    )
}

export default Loader
