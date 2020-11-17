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
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value}); 
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

                </form>
            </div>
        )
    }
}

export default Login;