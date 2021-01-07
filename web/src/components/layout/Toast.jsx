import React from 'react';
import loading from '../../images/loading.jpg';
import './css/Toast.css';

function Toast(){
    return (
        <div className='toast row'>
            <img 
                src={loading} 
                className='col-5'
                alt='profile pic' 
            />

            <div className='col-7 mt-2 p-0'>
                <strong>Gugsa Challa: </strong>

                <span>
                    {`adsfja;sdfkj a;fkjad;sfkja;
                    ads;fkja;dfkjad;fkjada;sdfkja;
                    adfadfaffffffff`.substring(0,70)}
                </span>
            </div>
        </div>
    )
}

export default Toast;