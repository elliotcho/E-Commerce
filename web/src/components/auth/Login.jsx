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
        return(
            <div className= 'login'>
                <form>
                    <h1>Login</h1>

                    <label htmlFor='username'>Username</label>
                    <input id='username' type='text' />

                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' />

                    <button className='btn btn-outline-success btn-block'>
                        Sign in
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