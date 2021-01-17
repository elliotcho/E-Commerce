import React, { useEffect, useState } from 'react';
import './css/EditReview.css';

function EditReview(props){
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('');

    useEffect(() => {
        setContent(props.content)
        setRating(props.rating);
    }, [props]);

    const handleChange = (e) => {
        const { value } = e.target;

        if(e.target.name === 'content'){
            setContent(value);
        } else{
            setRating(value);
        }
    }

    const closeModal = () => {
        setContent(props.content);
        setRating(props.rating);

        const closeButton = document.getElementById('close-edit');
        closeButton.click();
    }

    const saveChanges = async () => {
        const { reviewId, editReview } = props;

        //edit the review and close the modal
        await editReview(reviewId, content, rating);
        
        closeModal();
    }

    return(
        <EditReviewModal 
            content = {content}
            rating = {rating}
            handleChange = {handleChange}
            saveChanges = {saveChanges}
            closeModal = {closeModal}
        />
    )
}

function EditReviewModal({ 
    content, 
    rating,
    handleChange,
    saveChanges,
    closeModal
}){
    return (
        <div className='edit-modal modal fade' id='edit' data-backdrop='false'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h3>Edit Your review</h3>

                        <button className='close' onClick={closeModal}>
                            <span>&times;</span>
                        </button>

                        <button id='close-edit' data-dismiss='modal'/>
                    </div>

                    <div className='modal-body'>
                        <div className='form-group'>
                            <textarea 
                                value = {content}
                                name = 'content'
                                onChange = {handleChange}
                                rows = '8'
                            />
                        </div>

                        <label className='mr-3'>
                            Your Rating (x/5): 
                        </label>
                        
                        <select name='rating' value={rating} onChange={handleChange}>
                            <option value=""></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>

                    <div className='modal-footer'>
                        <button className='btn btn-secondary' onClick={closeModal}>
                            Close
                        </button>

                        <button className='btn btn-success' onClick={saveChanges}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditReview;