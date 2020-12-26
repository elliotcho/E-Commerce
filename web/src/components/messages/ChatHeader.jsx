import React, { useState, useEffect } from 'react';
import { getUserInfo, getProfilePic } from '../../api/user';
import loading from '../../images/loading.jpg';
import './css/ChatHeader.css';

function ChatHeader({ userId }){
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
    }, [userId])

    return(
        <div className='chat-header'>
            <img
                src = {imgURL? imgURL: loading}
                alt = 'Profile Pic'
            />

            <h3 className ='text-white'>
                {username}
            </h3>
        </div>
    )
}

export default ChatHeader;