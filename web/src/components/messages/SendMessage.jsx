import React from 'react';
import './css/SendMessage.css';

const ENTER_KEY = 13;

class SendMessage extends React.Component{
    handleKeyDown(e){
        if(e.keyCode === ENTER_KEY){
            
        }
    }

    render(){
        return(
            <div className='send-message'>
                <button>
                    +
                </button>

                <input 
                    type = 'text'
                    placeholder = 'Your Message Here'
                    onKeyDown = {this.handleKeyDown}
                />
            </div>
        )
    }
}

export default SendMessage;