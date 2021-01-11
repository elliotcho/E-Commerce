import React, { useEffect, useState } from 'react';
import './css/EditReview.css';

function EditReview(props){
    const [content, setContent] = useState('');
    useEffect(() => setContent(props.content), [props]);

    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const closeModal = () => {
        document.getElementById('close-edit').click();
    }

    const saveChanges = async () => {
        const { reviewId, editReview } = props;

        //edit the review and close the modal
        await editReview(reviewId, content);
        closeModal();
    }

    return(
        <EditReviewModal 
            content = {content}
            handleChange = {handleChange}
            saveChanges = {saveChanges}
            closeModal = {closeModal}
        />
    )
}

function EditReviewModal({ 
    content, 
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
                                onChange = {handleChange}
                                rows = '8'
                            />
                        </div>

                        <label className='mr-3'>
                            Your Rating (x/5): 
                        </label>
                        
                        <select name='rating'>
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