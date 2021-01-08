import React from 'react';
import './css/ReviewSettings.css';

function ReviewSettings({ reviewId, removeReview }){
    const editReview = () => {
        document.getElementById('open-edit').click();
    }

    return(
        <div className='review-settings'>
            <i className ='fas fa-ellipsis-h'/>

            <div className='dropdown-content'>
                <div className='option' onClick={() => removeReview(reviewId)}>

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