import React, { Component } from 'react';
import { deleteReview, getReviews } from '../../api/review';
import './css/Reviews.css';

class Reviews extends Component{
    constructor(){
        super();

        this.state = {
            reviews: []
        }

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

    async removeReview(id){
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

        return (
            <div className='reviews my-3'>
                {reviews.map(r => 
                    <div key={r._id} className='review'>
                        <div>
                            <div>
                                <img src={r.userPic} alt='profile pic' />
                            </div>

                            <h4 className='mt-3'>
                                Posted By
                            </h4>
                            
                            <p className='ml-4'>
                                {r.username}
                            </p>
                        </div>

                        <main>
                            {r.content}

                            <i 
                                className = 'fas fa-trash-alt ml-3'
                                onClick = {() => this.removeReview(r._id)}
                            />
                            <i 
                                className="fas rating fa-thumbs-up" 
                            
                            />
                            <i 
                                className="fas rating fa-thumbs-down"
                            />
                        </main>
                    </div>
                )}
            </div>
        )
    }
}

export default Reviews;