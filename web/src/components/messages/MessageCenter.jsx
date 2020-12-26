import React, { Component } from 'react';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import SendMessage from './SendMessage';
import './css/MessageCenter.css';

class MessageCenter extends Component{
    render(){
        return(
            <div className='message-center'>
                <Sidebar />      

                <main>
                    <ChatHeader />

                    <ChatContainer />
                    
                    <SendMessage />
                </main>    
            </div>
        )
    }
}

export default MessageCenter;