import React, {Component} from 'react';
import { register } from '../../routes/authRoutes';
import './css/Register.css';

class Register extends Component{
    constructor(){
        super();
        
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            errors: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        const{ email, username, password, confirmPassword } = this.state;
    
        if(password !== confirmPassword){
            this.setState({errors: [{
                    field: 'Password',
                    message: 'Passwords do not match'
                }]
            });

            return;
        }

        const userResponse = await register({ email, username, password });

        if(userResponse.user){
            this.props.history.push('/');
        } 
        
        else{
            this.setState({errors: userResponse.errors});
        }
    }

    render(){
        const{ email, username, password, confirmPassword, errors }= this.state;

        return(
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    
                    <label htmlFor='email'>Email Address </label>
                    <input
                        id='email'
                        type='text'
                        minLength='6'
                        maxLength='50'
                        value={email}
                        onChange={this.handleChange}
                        required
                    />
                    
                    <label htmlFor='username'>Enter Username </label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        minLength='2'
                        maxLength='30'
                        onChange={this.handleChange}
                        required
                    />
                    
                    <label htmlFor='password'>Password </label>
                    <input
                        id='password'
                        type='password'
                        minLength='6'
                        maxLength='50'
                        value={password}
                        onChange={this.handleChange}
                        required
                    />

                    <label htmlFor='confirmPassword'>Confirm Password </label>
                    <input
                        id='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required
                    />
                    
                    <button className='btn btn-outline-success btn-block'>
                        Register
                    </button>

                    <div style={{color: 'red'}}>
                        {errors.map(err => `${err.field} error: ${err.message}`)}
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;