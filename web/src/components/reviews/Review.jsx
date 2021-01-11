import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { decodeUser } from '../../utils/decodeUser';
import { formatCount } from '../../utils/formatCount';
import { createErrorToast } from '../../utils/createToast';
import * as reviewAPI from '../../api/review';
import EditReview from './EditReview';
import ReviewSettings from './ReviewSettings';
import './css/Review.css';

class Review extends Component{
    constructor(){
        super();

        this.state = {
            userLiked: false,
            userDisliked: false,
            likes: [],
            dislikes: []
        }

        this.verifyUserLike = this.verifyUserLike.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
        this.verifyUserDislike = this.verifyUserDislike.bind(this);
        this.toReviewDetails = this.toReviewDetails.bind(this);
    }

    async componentDidMount(){
        const { likes, dislikes } = this.props;
        

        await this.verifyUserLike();
        await this.verifyUserDislike();

        this.setState({ likes, dislikes });
    }

    async componentDidUpdate(prevProps){
        const { reviewId, likes, dislikes } = this.props;

        if(reviewId !== prevProps.reviewId){
            await this.verifyUserLike();
            await this.verifyUserDislike();

            this.setState({ likes, dislikes });
        }
    }

    async handleLike(){
        const user = decodeUser();

        if(!user){
            createErrorToast("User not logged in");
            return;
        }

        const { likes, dislikes, userLiked, userDisliked } = this.state;
        const { reviewId } = this.props;

        //remove dislike if user disliked
        if(userDisliked){
            await reviewAPI.removeDislike(reviewId);
            dislikes.splice(dislikes.indexOf(user._id), 1);
            this.setState({ userDisliked: false, dislikes });
        }

        //like the review
        if(!userLiked){
            await reviewAPI.likeReview(reviewId);
            likes.push(user._id);
            this.setState({ userLiked: true, likes });
        } 
        
        //unlike the review
        else{
            await reviewAPI.removeLike(reviewId);
            likes.splice(likes.indexOf(user._id), 1);
            this.setState({ userLiked: false, likes });
        }
    }   
    
    async handleDislike(){
        const user = decodeUser();

        if(!user){
            createErrorToast('User not logged in');
            return;
        } 

        const { likes, dislikes, userLiked, userDisliked } = this.state;
        const { reviewId } = this.props;

       //remove like if user liked
       if(userLiked){
            await reviewAPI.removeLike(reviewId);
            likes.splice(likes.indexOf(user._id), 1);
            this.setState({ userLiked: false, likes });
       }

        //dislike the review
        if(!userDisliked){
            await reviewAPI.dislikeReview(reviewId);
            dislikes.push(user._id);
            this.setState({ userDisliked: true, dislikes });
        } 
        
        //remove dislike
        else{
            await reviewAPI.removeDislike(reviewId);
            dislikes.splice(dislikes.indexOf(user._id), 1);
            this.setState({ userDisliked: false, dislikes });
        }
    }

    async verifyUserLike(){
        const { reviewId } = this.props;
        const { checkIfUserLiked } = reviewAPI;

        const { liked } = await checkIfUserLiked(reviewId);

        this.setState({ userLiked: liked });
    }

    async verifyUserDislike(){
        const { reviewId } = this.props;
        const { checkIfUserDisliked } = reviewAPI;

        const { disliked } = await checkIfUserDisliked(reviewId);

        this.setState({ userDisliked: disliked });
    }

    toReviewDetails(){
        const { history, reviewId } = this.props;
        
        const path = `/review/${reviewId}`;

        history.push(path);
    }

    render(){
        const { likes, dislikes, userLiked, userDisliked } = this.state;
        const { reviewId, seeMore, rating, userId, userPic, username, content } = this.props;

        const removeReview = () => this.props.removeReview(reviewId);

        const user = decodeUser();
        const isOwner = user && user._id === userId;

        let likeStyle = 'far fa-thumbs-up';
        let dislikeStyle = 'far fa-thumbs-down';

        if(userLiked){
            likeStyle += ' active';
        } 
        
        if(userDisliked){
            dislikeStyle += ' active';
        }

        return (
            <div className='review'>
                <div className='user-section'>
                    <img src={userPic} alt='profile pic' />
                  
                    <h4>Posted By</h4>
                    <p>{username}</p>

                    <span>Rating: {rating}/5</span>
                </div>

                <main>
                    <div className='row my-0'>
                        <button id='open-edit' data-toggle='modal' data-target='#edit' />

                        <div className='col-10 col-sm-11' />

                         <div className='col-2 col-sm-1'>
                            <ReviewSettings isOwner={isOwner} removeReview={removeReview}/>
                        </div>  
                    </div>

                    <div className='content'>
                        {(seeMore || content.length < 200) ? content : (
                            <div>
                                {`${content.substring(0,197)}...`}

                                <span onClick={this.toReviewDetails}>
                                    See More
                                </span>
                            </div>
                        )}
                    </div>

                    <section className='likes-section'>
                        <div className='row'>
                            <div className='col-6 col-sm-8' />   

                            <div className='col-3 col-sm-2'>
                                <i className={likeStyle} onClick={this.handleLike} />
                            </div>

                            <div className='col-3 col-sm-2'>
                                <i className={dislikeStyle} onClick={this.handleDislike} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-6 col-sm-8' />  

                            <div className='col-3 col-sm-2'>
                                <p>{formatCount(likes.length) || 0}</p>
                            </div>

                            <div className='col-3 col-sm-2'>
                                <p>{formatCount(dislikes.length) || 0}</p>
                            </div>
                        </div>
                    </section>
                </main>

                <EditReview 
                    reviewId = {reviewId}
                    editReview = {this.props.editReview} 
                    content = {content}
                    rating = {rating}
                />
            </div>
        )
    }
}

export default withRouter(Review);