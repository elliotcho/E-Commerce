import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { deleteReview, updateReview, getReviews } from '../../api/review';
import ReviewForm from './ReviewForm';
import Review from './Review';
import './css/ReviewList.css';
import { createErrorToast } from '../../utils/createToast';

class ReviewList extends Component{
    constructor(){
        super();

        this.state = {
            reviews: []
        }

        this.addReview = this.addReview.bind(this);
        this.removeReview = this.removeReview.bind(this);
        this.editReview = this.editReview.bind(this);
    }

    async componentDidMount(){
        const { productId } = this.props;
        
        if(productId){
            const reviews = await getReviews(productId);
            this.setState({ reviews });
        }
    }

    async componentDidUpdate(prevProps){
        const { productId } = this.props;

        if(productId && productId !== prevProps.productId){
            const reviews = await getReviews(productId);
            this.setState({ reviews });
        }
    }

    async addReview(){
        const { productId, getAvgRating } = this.props;

        const reviews = await getReviews(productId);
        await getAvgRating(productId);

        this.setState({ reviews });
    }

    async removeReview(id){
        const confirmDelete = async () => {
            const { reviews } = this.state;
            const { getAvgRating } = this.props;

            let productId;

            for(let i=0;i<reviews.length;i++){
                if(reviews[i]._id === id){
                    productId = reviews[i].productId;
                    reviews.splice(i, 1);
                    break;
                }
            }
    
            this.setState({ reviews });
            await deleteReview(id);
            await getAvgRating(productId);
        }

        confirmAlert({
            title: 'E-Commerce',
            message: 'Are you sure you want to delete this account',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => { return; }}
            ]
        });  
    }

    async editReview(reviewId, content, rating){
        const { reviews } = this.state;
        const { getAvgRating } = this.props;

        if(content.trim().length === 0){
            createErrorToast('Input cannot be blank');
            return;
        }

        let productId;

        for(let i=0;i<reviews.length;i++){
            if(reviews[i]._id === reviewId){
                reviews[i].content = content;
                reviews[i].rating = rating;
                productId = reviews[i].productId;
                break;
            }
        }

        await updateReview({ reviewId, content, rating });
        await getAvgRating(productId);

        this.setState({ reviews });
    }

    render(){
        const { reviews } = this.state;
        const { productId } = this.props;

        return (
            <div className='review-list'>
               <ReviewForm productId={productId} addReview={this.addReview}/>

                <div className='my-3'>
                    {reviews.map(r =>
                        <Review
                            key = {r._id}
                            reviewId = {r._id}
                            removeReview = {this.removeReview}
                            editReview = {this.editReview}
                            rating = {r.rating}
                            userId = {r.userId}
                            username = {r.username}
                            userPic = {r.userPic}
                            content = {r.content}
                            likes = {r.likes}
                            dislikes = {r.dislikes}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default ReviewList;