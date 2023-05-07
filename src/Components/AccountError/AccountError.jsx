import React from 'react';

//display Password Errors
const AccountError = (props) => {

    //if props.messages is an Array generate all <li>
    const listElements = (messages) => {
        const arr = []
        messages.forEach((message) => {
            arr.push(<li>{message}</li>)
        })
        return arr
    }
    
    return(
        <div className="error_msg">
            <ul>
                {!Array.isArray(props.message) ?
                <li>{props.message}</li> :
                listElements(props.message)}
            </ul>
        </div>
    );
}

export default AccountError;
