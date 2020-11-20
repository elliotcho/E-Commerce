import React, {Component} from 'react';
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

                    <label htmlFor='username'>Username</label>
                    <input 
                        name='username'
                        value={username}
                        onChange={this.handleChange} 
                        type='text' 
                        required
                    />

                    <label htmlFor='password'>Password</label>
                    <input 
                        name='password' 
                        value={password}
                        onChange={this.handleChange}
                        type='password' 
                        required
                    />

                    <button className='btn btn-outline-success btn-block'>
                        Sign in
                    </button>

                    <p className='text-white' onClick={this.toForgotPassword}>
                        Forgot Password?
                    </p>

                    <div style={{color: 'red'}}>
                        {errors.map(err => `${err.field} error: ${err.message}`)}
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;