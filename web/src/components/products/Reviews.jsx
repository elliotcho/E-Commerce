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

    render(){
        const { reviews } = this.state;

        return (
            <div className='reviews my-3'>
                {reviews.map(r => 
                    <div key={r._id}>
                        <p>
                            {r.content}
                        </p>

                        <p>
                            {new Date(r.datePosted).toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
        )
    }
}

export default Reviews;