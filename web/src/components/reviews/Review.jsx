import React, { Component } from 'react';
import { decodeUser } from '../../utils/decodeUser';
import { formatCount } from '../../utils/formatCount';
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
            alert("User not logged in");
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
            alert('User not logged in');
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

    render(){
        const { likes, dislikes, userLiked, userDisliked } = this.state;
        const { reviewId, userPic, username, content } = this.props;

        const removeReview = () => this.props.removeReview(reviewId);

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
                </div>

                <main>
                    <div className='row my-0'>
                         <div className='col-10' />

                         <button id='open-edit' data-toggle='modal' data-target='#edit' />

                         <div className='col-2'>
                            <ReviewSettings removeReview={removeReview}/>
                        </div>  
                    </div>

                    <div>{content}</div>

                    <section className='likes-section'>
                        <div className='row'>
                            <div className='col-8' />   

                            <div className='col-2'>
                                <i className={likeStyle} onClick={this.handleLike} />
                            </div>

                            <div className='col-2'>
                                <i className={dislikeStyle} onClick={this.handleDislike} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-8' />  

                            <div className='col-2'>
                                <p>{formatCount(likes.length) || 0}</p>
                            </div>

                            <div className='col-2'>
                                <p>{formatCount(dislikes.length) || 0}</p>
                            </div>
                        </div>
                    </section>
                </main>

                <EditReview content={content} editReview={this.props.editReview} />
            </div>
        )
    }
}

export default Review;