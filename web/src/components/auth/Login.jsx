import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { login } from '../../routes/authRoutes';
import './css/Login.css';

class Login extends Component{
    constructor(){
        super();

        this.state = {
            username: '',
            password: '',
            errors: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.toForgotPassword = this.toForgotPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value}); 
    }   

    toForgotPassword(){
        this.props.history.push('/forgot_password');
    }

    async handleSubmit(e){
        e.preventDefault();

        const { username, password } = this.state;
        
        const userResponse = await login({username, password});
        const { user } = userResponse;

        if(user){
            this.props.history.push('/');
        } 
        
        else{
            this.setState({errors: userResponse.errors});
        }
    }

    render(){
        const { username, password, errors } = this.state;

        return(
            <div className= 'login'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>

                    <input 
                        name='username'
                        value={username}
                        onChange={this.handleChange} 
                        placeholder ='Username here...'
                        type='text' 
                        required
                    />

                    <input 
                        name='password' 
                        value={password}
                        onChange={this.handleChange}
                        placeholder = 'Password here...'
                        type='password' 
                        required
                    />

                    <div className = 'text-center'>
                        <button className='btn btn-primary'>
                            Sign in
                        </button>
                    </div>

                    <p className='text-white mt-4' onClick={this.toForgotPassword}>
                        Forgot Password?
                    </p>

                    <div className='errors'>
                        {errors.map(err => `${err.field} error: ${err.message}`)}
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);