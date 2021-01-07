import React, { useState, useEffect} from 'react';
import { decodeUser } from '../../utils/decodeUser';
import { fetchUser } from '../../utils/fetchUser';
import { loadMessages, readMessages } from '../../api/message';
import { socket } from '../../App';
import loading from '../../images/loading.jpg';
import './css/ChatContainer.css';

function ChatContainer({ userId }){
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);

    const { _id: me } = decodeUser();

    useEffect(() => {
        const fetchData = async () => {
            setMessages(await loadMessages(userId));
        }

        socket.on('NEW_MESSAGE', async () => {
            const payload = await readMessages(userId);
            
            if(payload.ok){
                socket.emit('READ_MESSAGES', payload);
            }

            fetchData();
        });

        socket.on('READ_MESSAGES', () => fetchData());
        socket.on('IS_TYPING', () => setTyping(true));
        socket.on('STOP_TYPING', () => setTyping(false));

        fetchData();

        return () => socket.off('NEW_MESSAGE');
    }, [userId, me]);

    return(
        <div className='chat-container mt-5'>
            {typing && <TypingBubble userId={userId}/>}
    
            {messages.map(m => 
                <MessageBubble 
                    key = {m._id}
                    userId = {m.sender}
                    reader = {m.receiver}
                    dateSent = {m.dateSent}
                    isOwner = {m.sender === me}
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

function MessageBubble({ 
    userId, 
    reader, 
    dateSent, 
    isOwner, 
    content, 
    image, 
    read 
}){
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

    const dateSentTitle = `Sent ${new Date(dateSent).toLocaleString()}`;
    const dateReadTitle =  `Read ${new Date(read).toLocaleString()}`;

    return(
        <div 
            className={`message ${margin} mb-5`}
            data-toggle='tooltip'
            title={dateSentTitle}
        >
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
                            title={dateReadTitle}
                            alt = 'reader proflie pic' 
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatContainer;