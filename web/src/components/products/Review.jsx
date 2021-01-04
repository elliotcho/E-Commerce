import React, { Component } from 'react';
import { decodeUser } from '../../utils/decodeUser';
import { likeReview, checkIfUserLiked } from '../../api/review';
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

    render(){
        const { likes } = this.state;
        const { reviewId, userPic, username, content, removeReview } = this.props;

        return (
            <div className='review'>
                <div>
                    <div>
                        <img src={userPic} alt='profile pic' />
                    </div>

                    <h4 className='mt-3'>
                        Posted By
                    </h4>
                    
                    <p className='ml-4'>
                        {username}
                    </p>
                </div>

                <main>
                    {content}

                    <i 
                        className = 'fas fa-trash-alt ml-3'
                        onClick = {() => removeReview(reviewId)}
                    />
                    
                    <div className='mt-5'>
                        <div>
                            <i 
                                className="fas rating fa-thumbs-up mr-3" 
                                onClick = {this.handleLike}
                            />

                            {likes.length}
                        </div>

                        <div>
                            <i 
                                className="fas rating fa-thumbs-down mr-3"
                            />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Review;