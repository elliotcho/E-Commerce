import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../utils/fetchUser';
import { decodeUser } from '../../utils/decodeUser';
import { getSidebarChats } from '../../api/message';
import loading from '../../images/loading.jpg';
import './css/Sidebar.css';

function Sidebar({ history, match: { params }, socket }){
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setChats(await getSidebarChats());
        }

        if(socket) {
            socket.on('NEW_MESSAGE', () => {
                fetchData();
            });
        }

        fetchData();
    }, [socket]);

    const { _id: uid } = decodeUser();

    return(
        <div className='side-bar'>
           {chats.length? 
                (
                    chats.map(m => {
                        let userId;

                        if(m.receiver === uid){
                            userId = m.sender;
                        } else{
                            userId = m.receiver;
                        }

                        return (
                            <MessageCard 
                                key = {m._id}
                                toChat = {() => history.push(`/chat/${userId}`)}
                                content = {m.content}
                                userId = {userId}
                                activeId = {params.userId}
                                dateSent = {m.dateSent}
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

function MessageCard({ toChat, userId, activeId, content, dateSent }){    
    const isActive = (userId === activeId) ? 'active' : '';

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
        <div className={`p-4 text-white msg-card ${isActive}`} onClick={toChat}>
            <img src = {imgURL? imgURL: loading} alt = 'profile pic' />
            
            <div>
                <h3>{username}</h3>

                <p>{content}</p>

                <div>
                    {new Date(dateSent).toLocaleString()}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Sidebar);