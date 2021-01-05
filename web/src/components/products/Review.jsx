import React, { Component } from 'react';
import { decodeUser } from '../../utils/decodeUser';
import { likeReview, checkIfUserLiked, dislikeReview, checkIfUserDisliked } from '../../api/review';
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

        this.setState({ likes, dislikes });
    }

    async componentDidUpdate(prevProps){
        if(this.props.reviewId !== prevProps.reviewId){
            const { likes, dislikes } = this.props;

            await this.verifyUserLike();

            this.setState({ likes, dislikes });
        }
    }

    async verifyUserLike(){
        const { reviewId } = this.props;

        const { liked } = await checkIfUserLiked(reviewId);

        this.setState({ userLiked: liked });
    }

    async handleLike(){
        const user = decodeUser();

        if(!user){
            alert("User not logged in");
            return;
        }

        const { likes, userLiked } = this.state;
        const { reviewId } = this.props;

        if(!userLiked){
            await likeReview(reviewId);
            likes.push(user._id);
    
            this.setState({ likes, userLiked: true });
        }
    }    

    async verifyUserDislike(){
        const { reviewId } = this.props;

        const { disliked } = await checkIfUserDisliked(reviewId);

        this.setState({ userDisliked: disliked });
    }

    async handleDislike(){
        const user = decodeUser();

        if(!user){
            alert('User not logged in');
            return;
        } 

        const { dislikes, userDisliked } = this.state;
        const { reviewId } = this.props;

        if(!userDisliked){
            await dislikeReview(reviewId);
            dislikes.push(user._id);

            this.setState({ dislikes, userDisliked:true });
        }
    }

    render(){
        const { likes, dislikes, userLiked, userDisliked } = this.state;
        const { reviewId, userPic, username, content, removeReview } = this.props;

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

                         <div className='col-2'>
                            <ReviewSettings 
                                reviewId={reviewId} 
                                removeReview={removeReview} 
                            />
                        </div>  
                    </div>

                    <div>
                        {content}
                    </div>

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
                                <p>{likes.length}</p>
                            </div>

                            <div className='col-2'>
                                <p>{dislikes.length}</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default Review;