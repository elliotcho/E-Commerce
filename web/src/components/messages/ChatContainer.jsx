import React from 'react';
import loading from '../../images/loading.jpg';
import './css/ChatContainer.css';

function TypingBubble(){
    return(
        <div className='typing mr-auto ml-5 mb-5'>
            <img
                src = {loading}
                alt = 'profile pic'
            />

            <div>
                <p className='mt-3'>
                    <strong>Gugsa Challa</strong>
                    &nbsp; is typing...
                </p>
            </div>
        </div>
    )
}

function MessageBubble({i}){
    const margin = (i === 1) ? 'ml-auto mr-5': 'mr-auto ml-5';

    return(
        <div className={`message ${margin} mb-5`}>
            {i === 2? 
                <img
                    src = {loading}
                    alt = 'profile pic'
                /> :
                <div></div>
            }

            <div className='msg-bubble'>
                <p>
                    <strong>Gugsa Challa</strong>
                </p>

                <p>HELLO</p>

                <div className='read'>
                    <img 
                        src = {loading}
                        alt = 'proflie pic'
                    />
                </div>
            </div>
        </div>
    )
}

function ChatContainer(){
    const arr = [1,2,1,1,1,1,2,1,2,1,1,1,2,1,1,2]

    return(
        <div className='chat-container mt-5'>
            <TypingBubble/>
           {arr.map(i => <MessageBubble i={i}/>)}
        </div>
    )
}

export default ChatContainer;