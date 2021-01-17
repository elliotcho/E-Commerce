import React, { useState, useEffect, useContext } from 'react';
import { confirmAlert }from 'react-confirm-alert';
import { ThemeContext } from '../../contexts/ThemeContext';
import * as reviewAPI from '../../api/review';
import Review from './Review';
import './css/ReviewDetails.css';

const { getReviewById, deleteReview, updateReview } = reviewAPI;

const lightStyle = { backgroundColor: '#9ad3bc' };
const darkStyle = { backgroundColor: '#34626c' };

function ReviewDetails({ match: { params : { id } }, history }){
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setReview(await getReviewById(id));
        }

        fetchData();
    }, [id]);

    const removeReview = () => {
        const confirmDelete = async () => {
            await deleteReview(id);
            history.goBack();
        }

        confirmAlert({
            title: 'E-Commerce',
            message: 'Are you sure you want to delete this review?',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => { return; }}
            ]
        });  
    }

    const editReview = async (reviewId, content, rating) => {
        const data = { reviewId, content, rating };

        await updateReview(data);

        const newReview = {
            ...review,
            content,
            rating
        }

        setReview(newReview);
    }

    const { isDark } = useContext(ThemeContext);
    let style = lightStyle;

    if(isDark){
        style = darkStyle;
    } 

    return(
        <div className='review-details' style={style}>
             <main>
                {review && (
                    <Review
                      reviewId = {review._id}
                      removeReview = {removeReview}
                      editReview = {editReview}
                      seeMore = {true}
                      rating = {review.rating}
                      userId = {review.userId}
                      username = {review.username}
                      userPic = {review.userPic}
                      content = {review.content}
                      likes = {review.likes}
                      dislikes = {review.dislikes}
                    />
                )}
             </main>
        </div>
    )
}

export default ReviewDetails;