import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { API } from '../../constants';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import SendMessage from './SendMessage';
import './css/MessageCenter.css';

const wsEndpoint = `${API}`;
let socket;

function MessageCenter({ 
    match: { params: { userId } }
}){
    const token = localStorage.getItem('token');

    useEffect(() => {
        socket = socketIOClient(wsEndpoint);
        socket.emit('JOIN', { token });
      
        return () => {
            socket.emit('DISCONNECT', { token });
        }
    }, [token]);

    return(
        <div className='message-center'>
            <Sidebar socket = {socket}/>      

            <main>
                {userId && (
                    <>
                        <ChatHeader userId={userId}/>
                        <ChatContainer userId={userId} socket={socket}/>
                        <SendMessage userId={userId} socket={socket}/>
                    </>
                )}
            </main>    
        </div>
    )
}

export { socket };
export default MessageCenter;