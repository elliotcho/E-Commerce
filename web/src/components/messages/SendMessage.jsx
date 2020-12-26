import React from 'react';
import {sendMessage} from '../../api/message'
import './css/SendMessage.css';

const ENTER_KEY = 13;

class SendMessage extends React.Component{
    constructor(){
        super();
        this.state = {
            content: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleKeyDown(e){
        if(e.keyCode === ENTER_KEY){
            const receiverID = this.props.userId;
            const content = this.state;
            const data = {
                receiverID,
                content
            }
            const response = await sendMessage(data);
            console.log(response);
        }
    }

    render(){
        const content = this.state;
        return(
            <div className='send-message'>
                <button>
                    +
                </button>

                <input 
                    type = 'text'
                    placeholder = 'Your Message Here'
                    onKeyDown = {this.handleKeyDown}
                    onChange = {this.handleChange}
                    value = {content}
                    id= 'content'
                />
            </div>
        )
    }
}

export default SendMessage;