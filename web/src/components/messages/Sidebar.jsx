import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../utils/fetchUser';
import { decodeUser } from '../../utils/decodeUser';
import { readMessages, getSidebarChats } from '../../api/message';
import { socket } from '../../App';
import loading from '../../images/loading.jpg';
import './css/Sidebar.css';

const NEW_MESSAGE_EVENT = 'NEW_MESSAGE';
const READ_MESSAGES_EVENT = 'READ_MESSAGES';

function Sidebar({ history, userId: activeId }){
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setChats(await getSidebarChats());
        }
        
        socket.on(NEW_MESSAGE_EVENT, async () => {
            const payload = await readMessages(activeId);
            
            if(payload.ok){
                socket.emit(READ_MESSAGES_EVENT, payload);
            }

            fetchData();
        });

        socket.on(READ_MESSAGES_EVENT, () => fetchData());

        fetchData();

        return () => {
            socket.off(NEW_MESSAGE_EVENT);
            socket.off(READ_MESSAGES_EVENT);
        }
    }, [activeId]);

    const { _id: me } = decodeUser();

    return(
        <div className='side-bar'>
           {chats.length? 
                (
                    chats.map(m => {
                        const isRead = (me === m.sender || m.read);
                        const userId = (m.receiver === me) ? m.sender: m.receiver;
                        const isActive = userId === activeId;

                        const toChat = () => history.push(`/chat/${userId}`);

                        return (
                            <MessageCard 
                                key = {m._id}
                                toChat = {toChat}
                                isActive = {isActive}
                                dateSent = {m.dateSent}
                                content = {m.content}
                                userId = {userId}
                                isRead = {isRead}
                            /> 
                        )
                    }) 
                ):
                (
                    <h2 className='text-white p-4'>
                        You have no messages
                    </h2>
                )
           }
        </div>
    )
}

function MessageCard({ 
    toChat, 
    dateSent, 
    content, 
    userId, 
    isActive, 
    isRead 
}){    
    const activeStyle = isActive ? 'active' : '';

    const [username, setUsername] = useState('Loading...');
    const [imgURL, setImgURL] = useState(null);

    useEffect(() => {
        let isSubscribed = true;

        const fetchData = async () => {
            const { imgURL, user } = await fetchUser(userId);
 
            if(isSubscribed){
                setUsername(user.username);
                setImgURL(imgURL);
            }
         }

        fetchData();

        return () => isSubscribed = false;
    }, [userId]);

    return(
        <div className={`p-4 text-white msg-card ${activeStyle}`} onClick={toChat}>
            
            <img src = {imgURL? imgURL: loading} alt = 'profile pic' />
            
            <div>
                <h3>{username}</h3>

                <p style = { !isRead? {fontWeight: 'bold'}: {} }> 

                    {content? content: (
                        <span>
                            <i className = 'fas fa-image'/> IMAGE
                        </span>
                    )}

                </p>

                <div>
                    {new Date(dateSent).toLocaleString()}
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(Sidebar);