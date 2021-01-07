import React from 'react';
import loading from '../../images/loading.jpg';
import './css/Toast.css';

function Toast({ username, content, imgURL }){
    return (
        <div className='toast row'>
            <img 
                src={imgURL || loading} 
                className='col-5'
                alt='profile pic' 
            />

            <div className='col-7 mt-2 p-0'>
                <strong>{username}: </strong>

                <span>
                    {content.length > 70? `${content.substring(0, 67)}...` : content}
                </span>
            </div>
        </div>
    )
}

export default Toast;