import React, {Component} from 'react';
import { login } from '../../api/auth';
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
            window.location.reload();
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

                    <label htmlFor='username'>Enter Username </label>
                    <input 
                        name='username'
                        value={username}
                        onChange={this.handleChange} 
                        placeholder ='Username here...'
                        type='text' 
                        required
                    />

                    <label htmlFor='password'>Enter Password </label>
                    <input 
                        name='password' 
                        value={password}
                        onChange={this.handleChange}
                        placeholder = 'Password here...'
                        type='password' 
                        required
                    />

                    <div className = 'text-center'>
                        <button  className='btn btn-primary'>
                            Sign In
                        </button>
                    </div>

                    <p className='text-white mt-4' onClick={this.toForgotPassword}>
                        Forgot Password?
                    </p>

                    <div className='errors'>
                        {errors.map(err => `${err.field} error: ${err.msg}`)}
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;