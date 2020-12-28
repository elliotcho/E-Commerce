import React, { useState, useEffect } from 'react';
import { fetchUser } from '../../utils/fetchUser';
import loading from '../../images/loading.jpg';
import './css/ChatHeader.css';

function ChatHeader({ userId }){
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
        <div className='chat-header'>
            <img src = {imgURL? imgURL: loading} alt = 'Profile Pic' />

            <h3 className ='text-white'>
                {username}
            </h3>
        </div>
    )
}

export default ChatHeader;