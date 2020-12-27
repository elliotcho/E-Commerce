import React from 'react';
import { sendMessage } from '../../api/message'
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
            const receiver = this.props.userId;
            const { content } = this.state;

            const data = { receiver, content };

            await sendMessage(data);
            
            this.setState({ content: '' });
        }
    }

    render(){
        const { content } = this.state;

        return(
            <div className='send-message'>
                <button>
                    <label htmlFor="">+</label>
                </button>

                <input 
                    id= 'content'
                    type = 'text'
                    placeholder = 'Your Message Here'
                    onKeyDown = {this.handleKeyDown}
                    onChange = {this.handleChange}
                    value = {content}
                />
            </div>
        )
    }
}

export default SendMessage;