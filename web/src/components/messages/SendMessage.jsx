import React from 'react';
import { socket } from './MessageCenter';
import { sendMessage } from '../../api/message';
import './css/SendMessage.css';

const ENTER_KEY = 13;
let tO;

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
        const payload={ receiverId: this.props.userId };

        if(e.target.value === ''){
            socket.emit('STOP_TYPING', payload);
        } else {
            socket.emit('IS_TYPING', payload);

            if(tO){
                clearTimeout(tO);
            }
            
            tO = setTimeout(() => {
                socket.emit('STOP_TYPING', payload)
            }, 5000);
        }
        
        this.setState({[e.target.id]: e.target.value});
    }

    async handleKeyDown(e){
        if(e.keyCode === ENTER_KEY){
            const receiver = this.props.userId;
            const { content } = this.state;

            const payload = await sendMessage({ receiver, content }, false);

            socket.emit('STOP_TYPING', { receiverId: receiver });
            socket.emit('NEW_MESSAGE', payload);

            this.setState({ content: '' });
        }
    }

    async sendPhoto(e){
        const receiver = this.props.userId;

        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        formData.append('receiver', receiver);

        const payload = await sendMessage(formData, true);

        socket.emit('STOP_TYPING', { receiverId: receiver });
        socket.emit('NEW_MESSAGE', payload);
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