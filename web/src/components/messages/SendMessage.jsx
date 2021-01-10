import React from 'react';
import { sendMessage } from '../../api/message';
import { socket } from '../../App';
import './css/SendMessage.css';

//socket events
const NEW_MESSAGE_EVENT = 'NEW_MESSAGE';
const IS_TYPING_EVENT = 'IS_TYPING';
const STOP_TYPING_EVENT = 'STOP_TYPING';

//other constants
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
        const payload = { receiverId: this.props.userId };

        if(e.target.value === ''){
            socket.emit(STOP_TYPING_EVENT, payload);
        } 
        
        else {
            socket.emit(IS_TYPING_EVENT, payload);

            if(tO) clearTimeout(tO);

            const cb = () => socket.emit(STOP_TYPING_EVENT, payload);
            tO = setTimeout(cb, 5000);
        }
        
        this.setState({ [e.target.id]: e.target.value });
    }

    async handleKeyDown(e){
        const { content } = this.state;

        if(e.keyCode === ENTER_KEY && content.trim().length !== 0){

            const receiver = this.props.userId;
        
            const payload = await sendMessage({ receiver, content }, false);

            socket.emit(STOP_TYPING_EVENT, { receiverId: receiver });
            socket.emit(NEW_MESSAGE_EVENT, payload);

            this.setState({ content: '' });

        }
    }

    async sendPhoto(e){
        const receiver = this.props.userId;

        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        formData.append('receiver', receiver);

        const payload = await sendMessage(formData, true);

        socket.emit(STOP_TYPING_EVENT, { receiverId: receiver });
        socket.emit(NEW_MESSAGE_EVENT, payload);
    }

    attachPhoto(){
        document.getElementById('photo').click();
    }

    render(){
        const { content } = this.state;

        return(
            <div className='send-message'>
                <button className='btn btn-primary' onClick={this.attachPhoto}>
                    <label>+</label>
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