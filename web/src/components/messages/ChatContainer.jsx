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
        socket.on('READ_MESSAGE', () => fetchData());

        socket.on('IS_TYPING', () => setTyping(true));
        socket.on('STOP_TYPING', () => setTyping(false));

        fetchData();
    }, [userId]);

    const { _id: uid } = decodeUser();

    return(
        <div className='chat-container mt-5'>
            {typing && <TypingBubble userId={userId}/>}
    
            {messages.map(m => 
                <MessageBubble 
                    key = {m._id}
                    userId = {m.sender}
                    reader = {m.receiver}
                    isOwner = {m.sender === uid}
                    content = {m.content}
                    image = {m.image}
                    read = {m.read}
                />
            )}
        </div>
    )
}

function TypingBubble({ userId }){
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
        <div className='typing mr-auto ml-5 mb-5'>
            <img src={imgURL? imgURL: loading} alt='profile pic' />

            <div>
                <p className='mt-3'>
                    <strong>{username} </strong> is typing...
                </p>
            </div>
        </div>
    )
}

function MessageBubble({ userId, reader, isOwner, content, image, read }){
    const margin = (isOwner) ? 'ml-auto mr-5': 'mr-auto ml-5';

    const [username, setUsername] = useState('Loading...');
    const [readerPic, setReaderPic] = useState(null);
    const [imgURL, setImgURL] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
           const { imgURL, user } = await fetchUser(userId);
           const  { imgURL: readerPic } = await fetchUser(reader);

           setReaderPic(readerPic);
           setUsername(user.username);
           setImgURL(imgURL);
        }

        fetchData();
    }, [userId, reader]);

    const isRead = read && isOwner;

    return(
        <div className={`message ${margin} mb-5`}>
            {!isOwner? 
                <img src={imgURL? imgURL: loading} alt='owner profile pic'/> : <div/>
            }

            <div className='msg-bubble'>
                <p><strong>{username}</strong></p>

                {image && <img src={image} alt='message pic'/>}
                {content && <p>{content}</p>}

                <div className='read'>
                    {isRead && (
                        <img 
                            src={readerPic? readerPic: loading} 
                            data-toggle='tooltip'
                            title={new Date(read).toLocaleString()}
                            alt = 'reader proflie pic' 
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatContainer;