import React from 'react';
import './css/InfoToast.css';

function InfoToast({ text }){
    return(
        <div className='info-toast text-center'>
            {text}
        </div>
    )
}

export default InfoToast;