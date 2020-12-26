import React from 'react';
import loading from '../../images/loading.jpg';
import './css/ChatHeader.css';

function ChatHeader(){
    return(
        <div className='chat-header'>
            <img
                src = {loading}
                alt = 'Profile Pic'
            />

            <h3 className ='text-white'>
                Gugsa Challa
            </h3>
        </div>
    )
}

export default ChatHeader;