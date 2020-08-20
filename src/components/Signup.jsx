import React from 'react'

function Signup({userFormData, handleChange, handleSubmitSignup}) {
    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmitSignup}>
                <label>Username</label>
                <input 
                    type='text' 
                    name='username' 
                    value={userFormData.username} 
                    onChange={handleChange}
                    />
                <label>Email</label>
                <input 
                    type='text' 
                    name='email' 
                    value={userFormData.email} 
                    onChange={handleChange}
                    />
                <label>Password</label>
                <input 
                    type='text' 
                    name='password' 
                    value={userFormData.password} 
                    onChange={handleChange}
                    />
                <input type="submit" value='Create the Account'/>
            </form>
        </div>
    )
}

export default Signup
