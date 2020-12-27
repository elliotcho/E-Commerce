import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import { getUserInfo, getProfilePic } from '../../api/user';
import { getSidebarChats } from '../../api/message';
import loading from '../../images/loading.jpg';
import './css/Sidebar.css';

function MessageCard({ history, userId, activeId, content, dateSent }){
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

    const toChat = () => history.push(`/chat/${userId}`);

    const isActive = (userId === activeId) ? 'active' : '';

    return(
        <div className={`p-4 text-white msg-card ${isActive}`} onClick={toChat}>
            <img
                src = {imgURL? imgURL: loading}
                alt = 'profile pic'
            />
            
            <div>
                <h3>{username}</h3>

                <p>
                    {content}
                </p>

                <div>
                    {new Date(dateSent).toLocaleString()}
                </div>
            </div>
        </div>
    )
}

function Sidebar({ history, match: { params } }){
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setChats(await getSidebarChats());
        }

        fetchData();
    }, []);

    let uid;

    try { 
        const token = localStorage.getItem('token');
        const { user } = decode(token);

        uid = user._id;
        
    } catch (err) { }

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
                                history = {history}
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

export default withRouter(Sidebar);