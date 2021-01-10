import React from 'react';
import { withRouter } from 'react-router-dom';
import loading from '../../images/loading.jpg';
import './css/MessageToast.css';

function MessageToast({ userId, username, content, imgURL, history }){
    let text = content;

    if(content.length > 70){
        text = `${content.substring(0, 67)}...`;
    }

    const toChat = () => {
        if(userId){
            history.push(`/chat/${userId}`);
        }
    }

    return (
        <div className='msg-toast row' onClick={toChat}>
            <img 
                src={imgURL || loading} 
                className='col-5'
                alt='profile pic' 
            />

            <div className='col-7 mt-2 p-0'>
                <strong>{username}: </strong>

                <span>
                    {text}
                </span>
            </div>
        </div>
    )
}

export default withRouter(MessageToast);