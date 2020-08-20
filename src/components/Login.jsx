import React from 'react'

function Login({userFormData, handleChange, handleSubmitLogin}) {
    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmitLogin}>
                <label>Username</label>
                <input 
                    type='text' 
                    name='username' 
                    value={userFormData.username} 
                    onChange={handleChange}
                    />
                <label>Password</label>
                <input 
                    type='text' 
                    name='password' 
                    value={userFormData.password} 
                    onChange={handleChange}
                    />
                <input type="submit" value='LogIn'/>
            </form>
        </div>
    )
}

export default Login
