import React, { useState, useEffect} from 'react';
import { socket } from './MessageCenter';
import { decodeUser } from '../../utils/decodeUser';
import { fetchUser } from '../../utils/fetchUser';
import { loadMessages } from '../../api/message';
import loading from '../../images/loading.jpg';
import './css/ChatContainer.css';

function ChatContainer({ userId }){
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
            setMessages(await loadMessages(userId));
        }

        socket.on('NEW_MESSAGE', () => fetchData());
        socket.on('TYPING', () => setTyping(true));

        fetchData();
    }, [userId]);

    const { _id: uid } = decodeUser();

    return(
        <div className='chat-container mt-5'>
            {typing && <TypingBubble />}
    
            {messages.map(m => 
                <MessageBubble 
                    key = {m._id}
                    userId = {m.sender}
                    isOwner = {m.sender === uid}
                    content = {m.content}
                    read = {m.read}
                />
            )}
        </div>
    )
}

function TypingBubble(){
    return(
        <div className='typing mr-auto ml-5 mb-5'>
            <img src = {loading} alt = 'profile pic' />

            <div>
                <p className='mt-3'>
                    <strong>Gugsa Challa </strong> is typing...
                </p>
            </div>
        </div>
    )
}

function MessageBubble({ isOwner, userId, content, read }){
    const margin = (isOwner) ? 'ml-auto mr-5': 'mr-auto ml-5';

    const [username, setUsername] = useState('Loading...');
    const [imgURL, setImgURL] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
           const { imgURL, user } = await fetchUser(userId);

           setUsername(user.username);
           setImgURL(imgURL);
        }

        fetchData();
    }, [userId]);

    return(
        <div className={`message ${margin} mb-5`}>
            {!isOwner? 
                <img src = {imgURL? imgURL: loading} alt = 'profile pic' /> : <div />
            }

            <div className='msg-bubble'>
                <p><strong>{username}</strong></p>

                <p>{content}</p>

                <div className='read'>
                    {read && <img src = {loading} alt = 'proflie pic' />}
                </div>
            </div>
        </div>
    )
}

export default ChatContainer;