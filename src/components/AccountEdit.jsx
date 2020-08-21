import React from 'react'

function AccountEdit({userFormData, handleChange, handleSubmitEdit}) {
    const {name = '', country = '', languages = ''} = userFormData
    return (
        <div>
            <h1>Edit your personal data</h1>
            <form onSubmit={handleSubmitEdit}>
                <label>Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={handleChange}
                    />
                <label>Country</label>
                <input 
                    type="text" 
                    name="country" 
                    value={country} 
                    onChange={handleChange}
                    />
                <label>Languages</label>
                <input 
                    type="text" 
                    name="languages" 
                    value={languages} 
                    onChange={handleChange}
                    />
                <input type="submit" value='Submit new data'/>
            </form>
        </div>
    )
}

export default AccountEdit
