import React, {Component} from 'react';
import { forgotPassword } from '../../api/auth';
import "./css/ForgotPassword.css"

class ForgotPassword extends Component{
    constructor(){
        super();

        this.state = {
            email: '',
            submitted: false,
            isFetching: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        if(!this.state.isFetching){
            this.setState({ isFetching: true });

            await forgotPassword({email: this.state.email});

            this.setState({ submitted: true, isFetching: false });
        }
    }

    render(){
        const { email, submitted, isFetching } = this.state;

        return(
            <div className="forgot-pwd">
                <div className='mx-auto'>
                    
                    {!submitted?
                       
                       (<form onSubmit={this.handleSubmit}>
                            <h2 className = 'mb-4'>
                                Forgot your password? 
                                Don't worry, we will send 
                                you an email to reset it! 
                            </h2>
                        
                            <input
                                id = 'email'
                                placeholder='Your email here'
                                onChange={this.handleChange}
                                value = {email}
                                type = 'email'
                            />
                      
                            <button className='btn btn-success mt-3'>
                                {isFetching? 'Loading...' : 'Submit'}
                            </button>
                        </form>) : 

                        (<div>
                            <h3>
                                If an account with 
                                that email exists, 
                                we sent you an email
                            </h3>
                        </div>)
                        
                    }

                </div>         
            </div>
        )
    }
}

export default ForgotPassword;