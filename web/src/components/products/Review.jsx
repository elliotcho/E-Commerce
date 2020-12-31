import React, { Component } from 'react';

class Review extends Component{
    constructor(){
        super();

        this.state = {
            content: '',
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const productId = this.props.productId;

        }

    }

    render(){
        return(
            <div>
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

export default Review;
