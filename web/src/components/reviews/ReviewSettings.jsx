import React from 'react';
import './css/ReviewSettings.css';

function ReviewSettings({ isOwner, removeReview }){
    const visibility = isOwner? 'visible' : 'hidden';

    const editReview = () => {
        const openButton = document.getElementById('open-edit');
        openButton.click();
    }
    
    return(
        <div className='review-settings' style={{visibility}}>
            <i className ='fas fa-ellipsis-h'/>

            <div className='dropdown-content'>
                <div className='option' onClick={() => removeReview()}>

                    <i className='fas fa-trash-alt' />
                    <span className='ml-3'>Delete</span>

                </div>

                <div className='option' onClick={() => editReview()}>

                    <i className ='fas fa-edit' />
                    <span className='ml-3'>Edit</span>
                    
                </div>
            </div>
        </div>
    )
}

export default ReviewSettings;