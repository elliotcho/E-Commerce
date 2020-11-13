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
                    <h3>Sign In</h3>

                    <input 
                        id = 'username'
                        type = 'text'
                        onChange = {this.handleChange}
                        value = {username}
                    />

                    <input
                        id = 'password'
                        type = 'password'
                        onChange = {this.handleChange}
                        value = {password}
                    />
                </form>
            </div>
        )
    }
}

export default Login;