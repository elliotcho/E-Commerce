import React, { useEffect, useState } from 'react';

function EditReview(props){
    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(props.content);
    }, [props]);

    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const closeModal = () => {
        
    }

    return(
        <EditReviewModal 
            content = {content}
            handleChange = {handleChange}
        />
    )
}

function EditReviewModal({ content, handleChange }){
    return (
        <div className='edit-modal modal fade' id='edit' data-backdrop='false'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h3>Edit Your review</h3>

                        <button>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className='modal-body'>
                        <div className='form-group'>
                            <textarea 
                                value = {content}
                                onChange = {handleChange}
                                rows = '8'
                            />
                        </div>
                    </div>

                    <div className='modal-footer'>
                        <button className='btn btn-secondary'>
                            Close
                        </button>

                        <button className='btn btn-success'>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditReview;