import React from 'react'
import './NotSignedIn.css'

//JSX Element for display page saying user is not signed in
const NotSignedIn = ()  => {
    return(
        <div className='mustsignin-container'>
            <p>Need to be signed in to use</p>
        </div>
    );
}

export default NotSignedIn