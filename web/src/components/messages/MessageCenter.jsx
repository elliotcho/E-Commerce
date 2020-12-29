import React from 'react';
import socketIOClient from 'socket.io-client';
import { API } from '../../constants';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import SendMessage from './SendMessage';
import './css/MessageCenter.css';

const wsEndpoint = `${API}`;
let socket;

class MessageCenter extends React.Component{
    constructor(){
        super();
        socket = socketIOClient(wsEndpoint);
    }

    componentDidMount(){
        socket.emit('JOIN', {
            token: localStorage.getItem('token')
        });
    }

    componentWillUnmount(){
        socket.emit('DISCONNECT', {
            token: localStorage.getItem('token')
        });

        socket.disconnect();
    }

    render(){
        const { match: { params: { userId } } } = this.props

        return(
            <div className='message-center'>
                <Sidebar />      
    
                <main>
                    {userId && (
                        <>
                            <ChatHeader userId = {userId}/>
                            <ChatContainer userId = {userId} />
                            <SendMessage userId={userId}/>
                        </>
                    )}
                </main>    
            </div>
        )
    }
}

export { socket };
export default MessageCenter;