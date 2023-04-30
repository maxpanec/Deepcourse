import React from 'react';

const AccountError = (props) => {

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
