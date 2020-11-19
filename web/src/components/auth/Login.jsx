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
                <h3>Login</h3>
                <form>
                    <input type='text' />

                    <input type='password' />

                    <button>Sign in</button>
                  
                    <p className='text-white' onClick={this.toForgotPassword}>
                        Forgot Password?
                    </p>
                </form>
            </div>
        )
    }
}

export default Login;