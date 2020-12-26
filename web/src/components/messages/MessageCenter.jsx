import React from 'react';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import SendMessage from './SendMessage';
import './css/MessageCenter.css';

function MessageCenter({ 
    match: { params: { userId } }
}){
    return(
        <div className='message-center'>
            <Sidebar />      

            <main>
                {userId && (
                    <>
                        <ChatHeader userId = {userId}/>
                        <ChatContainer />
                        <SendMessage />
                    </>
                )}
            </main>    
        </div>
    )
}

export default MessageCenter;