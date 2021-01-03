import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { fetchUser } from '../../utils/fetchUser';
import loading from '../../images/loading.jpg';
import './css/ChatHeader.css';

const lightStyle = { backgroundColor: '#34626c', color: 'white' };
const darkStyle = { backgroundColor: '#8ec6c5', color: 'black' };

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

    
    const { isDark } = useContext(ThemeContext);

    const style = isDark? darkStyle: lightStyle;

    return(
        <div className='chat-header' style={style}>
            <img src = {imgURL? imgURL: loading} alt = 'Profile Pic' />

            <h3>
                {username}
            </h3>
        </div>
    )
}

export default ChatHeader;