import React, {Component} from 'react';
import axios from 'axios';

class ForgotPassword extends Component{
    constructor(){
        super();

        this.state = {
            email: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        const {email} = this.state;
        const config = {headers: {'content-type': 'application/json'}};

        await axios.post('http://localhost:5000/api/user/forgot_password', {email}, config);

        this.setState({submitted: true});
    }

    render(){
        const { email, submitted } = this.state;

        return(
            <div>
                {!submitted?
                    (<form onSubmit={this.handleSubmit}>
                        <input
                            id = 'email'
                            value = {email}
                            type = 'email'
                            placeholder='Your email here'
                            onChange={this.handleChange}
                        />


                        <button className='btn btn-success'>
                            Submit
                        </button>
                    </form>) : 
                    (<h3>
                        If an account with that email exists, we sent you an email
                    </h3>)
                }
            </div>
        )
    }
}

export default ForgotPassword;