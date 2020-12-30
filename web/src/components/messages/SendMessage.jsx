import React from 'react';
import { socket } from './MessageCenter';
import { sendMessage } from '../../api/message';
import { decodeUser } from '../../utils/decodeUser';
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
        this.sendPhoto = this.sendPhoto.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
        const { _id: me } = decodeUser();
        const payload={
            senderId: me,
            receiverId: this.props.userId
        };
        socket.emit('TYPING', payload);
    }

    async handleKeyDown(e){
        if(e.keyCode === ENTER_KEY){
            const receiver = this.props.userId;
            const { content } = this.state;

            const payload = await sendMessage({ receiver, content });

            socket.emit('NEW_MESSAGE', payload);
            this.setState({ content: '' });
        }
    }

    sendPhoto(){

    }

    render(){
        const { content } = this.state;

        return(
            <div className='send-message'>
                <button className='btn btn-primary'>
                    <label htmlFor="photo">+</label>
                </button>

                <input
                    id = 'photo'
                    type = 'file'
                    onChange = {this.sendPhoto}
                    style = {{display: 'none'}}
                    accept = 'jpg jpeg png'
                />

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