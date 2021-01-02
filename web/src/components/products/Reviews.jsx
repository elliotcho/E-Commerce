import React, { Component } from 'react';
import { getReviews } from '../../api/review';
import './css/Reviews.css';

class Reviews extends Component{
    constructor(){
        super();

        this.state = {
            reviews: []
        }
    }

    async componentDidMount(){
        const { productId } = this.props;
        
        if(productId) {
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
                            
                            <p>
                                {r.username}
                            </p>
                        </div>

                        <div>
                            {r.content}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Reviews;