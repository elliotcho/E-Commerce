import React, {Component} from 'react';
import './css/Register.css';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id] : e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const{email, username, password, confirmPassword} = this.state;
        

        if(password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }

        //const data = {
         //   email,
           // username,
           // password
        //}
        //call to route with data object
    }

    render(){
        const{email, username, password, confirmPassword}= this.state;
        return(
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    

                    <label htmlFor='email'>Email Address </label>
                    <input
                        id='email'
                        type='email'
                        minLength='6'
                        maxLength='49'
                        value={email}
                        onChange={this.handleChange}
                        required
                        />
                    
                    <label htmlFor='username'>Enter Username </label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        minLength='4'
                        maxLength='30'
                        onChange={this.handleChange}
                        required
                        />
                    
                    <label htmlFor='password'>Password </label>
                    <input
                        id='password'
                        type='password'
                        minLength='6'
                        maxLength='49'
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
                </form>
            </div>
        )
    }
}

export default Register;