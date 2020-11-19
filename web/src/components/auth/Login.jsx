import React, {Component} from 'react';
import './css/Login.css';

class Login extends Component{
    constructor(){
        super();

        this.state = {
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.toForgotPassword = this.toForgotPassword.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value}); 
    }   

    toForgotPassword(){
        this.props.history.push('/forgot_password');
    }

    render(){
        const {username, password} = this.state;

        return(
            <div className='login d-flex align-items-center'>
                <form>
                    <h1>Log In</h1>

                    <label htmlFor="username">Username</label>
                    <input 
                        id = 'username'
                        type = 'text'
                        onChange = {this.handleChange}
                        value = {username}
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input
                        id = 'password'
                        type = 'password'
                        onChange = {this.handleChange}
                        value = {password}
                    />

                    <button className='btn btn-outline-success btn-block'>
                        Sign In 
                    </button>

                    <p className='text-white' onClick={this.toForgotPassword}>
                        Forgot Password?
                    </p>
                </form>
            </div>
        )
    }
}

export default Login;