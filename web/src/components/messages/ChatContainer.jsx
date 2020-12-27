import React, { useState, useEffect} from 'react';
import decode from 'jwt-decode';
import { getUserInfo, getProfilePic } from '../../api/user';
import { loadMessages } from '../../api/message';
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

function MessageBubble({ isOwner, userId, content }){
    const margin = (isOwner) ? 'ml-auto mr-5': 'mr-auto ml-5';

    const [username, setUsername] = useState('Loading...');
    const [imgURL, setImgURL] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const picturePromise = getProfilePic(userId);
            const userPromise = getUserInfo(userId);
    
            const [imgURL, user] = await Promise.all([picturePromise, userPromise]);
    
            setUsername(user.username);
            setImgURL(imgURL)
        }

        fetchData();
    }, [userId]);

    return(
        <div className={`message ${margin} mb-5`}>
            {!isOwner? 
                <img
                    src = {imgURL? imgURL: loading}
                    alt = 'profile pic'
                /> :
                <div />
            }

            <div className='msg-bubble'>
                <p>
                    <strong>{username}</strong>
                </p>

                <p>{content}</p>

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

function ChatContainer({ userId }){
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setMessages(await loadMessages(userId));
        }

        fetchData();
    }, [userId]);

    let uid;

    try { 
        const token = localStorage.getItem('token');
        const { user } = decode(token);

        uid = user._id;
    } catch (err) { }

    return(
        <div className='chat-container mt-5'>
            {messages.map(m => 
                <MessageBubble 
                    userId = {m.sender}
                    isOwner = {m.sender === uid}
                    content = {m.content}
                />
            )}
        </div>
    )
}

export default ChatContainer;