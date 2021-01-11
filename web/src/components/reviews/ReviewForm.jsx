import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createErrorToast } from '../../utils/createToast';
import { createReview} from '../../api/review';
import './css/ReviewForm.css';

class ReviewForm extends Component {
    constructor(){
        super();

        this.state = {
            content: '',
            rating: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e){
        e.preventDefault();

        const { productId, addReview } = this.props;
        const { content, rating } = this.state;

        if(!rating || content.trim().length === 0){
            const msg = (!rating) ? 'A rating is required' : 'Input cannot be blank';
            createErrorToast(msg);
            return;
        }
   
        const { ok }  = await createReview({ content, productId, rating });

        if(ok) {
            this.setState({ content: '' });
            addReview();
        } 
        
        else{
            createErrorToast('User must be signed in');
        }
    }

    render(){
        return(
            <div className='review-form'>
                <form onSubmit={ this.handleSubmit }>
                    <label htmlFor='content'>Leave a Review</label>

                    <textarea
                        name='content'
                        type='text'
                        placeholder = 'Your review here...'
                        onChange={ this.handleChange }
                        value={ this.state.content }
                    />

                    <div className='my-4'>
                        <label className='mr-3'>
                            Your Rating (x/5): 
                        </label>
                        
                        <select name='rating' onChange={this.handleChange}>
                            <option value=""></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>

                    <button className='btn btn-success mt-3'>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(ReviewForm);