import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createReview } from '../../api/review';
import './css/ReviewForm.css';

class ReviewForm extends Component {
    constructor(){
        super();

        this.state = {
            content: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e){
        e.preventDefault();

        const { history, productId } = this.props;
        const { content } = this.state;

        const { ok, review }  = await createReview({ content, productId });

        if(ok) {
            console.log(review);
            this.setState({ content: '' });
        } else{
            history.push('/login');
        }
    }

    render(){
        return(
            <div className='review-form'>
                <form onSubmit={ this.handleSubmit }>
                    <label htmlFor='content'>Leave a Review</label>

                    <input
                        name='content'
                        type='text'
                        onChange={ this.handleChange }
                        value={ this.state.content }
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(ReviewForm);
