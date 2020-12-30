import React, { Component } from 'react';

class Review extends Component{
    constructor(){
        super();

        this.state = {
            content: '',
        }
    }

    handleChange(e){

    }

    render(){
        return(
            <div>
                <form>
                    <label name='content'>Leave a Review</label>
                    <input
                        name='content'
                        type='text'
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        )
    }
}

export default Review;
