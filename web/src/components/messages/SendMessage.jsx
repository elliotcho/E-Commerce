import React from 'react';
import './css/SendMessage.css';

function SendMessage(){
    return(
        <div className='send-message'>
            <button>
                +
            </button>

            <input 
                type = 'text'
                placeholder = 'Your Message Here'
            />
        </div>
    )
}

export default SendMessage;