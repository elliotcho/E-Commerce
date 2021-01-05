import React, { Component } from 'react';
import { deleteReview, getReviews } from '../../api/review';
import ReviewForm from './ReviewForm';
import Review from './Review';
import './css/ReviewList.css';

class ReviewList extends Component{
    constructor(){
        super();

        this.state = {
            reviews: []
        }

        this.addReview = this.addReview.bind(this);
        this.removeReview = this.removeReview.bind(this);
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
        const { productId } = this.props;

        const reviews = await getReviews(productId);

        this.setState({ reviews });
    }

    async removeReview(id){
        if(!window.confirm('Are you sure?')){
            return;
        }

        const { reviews } = this.state;

        for(let i=0;i<reviews.length;i++){
            if(reviews[i]._id === id){
                reviews.splice(i, 1);
                break;
            }
        }

        this.setState({ reviews });
        await deleteReview(id);
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