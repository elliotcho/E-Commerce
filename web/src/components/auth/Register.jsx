import React, {Component} from 'react';
import { register } from '../../api/auth';
import './css/Register.css';

class Register extends Component{
    constructor(){
        super();
        
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            adminCode: '',
            showAdmin: false,
            errors: []
        }

        this.toggleAdmin = this.toggleAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleAdmin(){
        const { showAdmin } = this.state;

        if(showAdmin){
            this.setState({ showAdmin: false, adminCode: ''})
        } else{
            this.setState({ showAdmin: true });
        }
    }

    handleChange(e){
        this.setState({[e.target.id] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        const{ email, username, password, confirmPassword, adminCode } = this.state;
    
        if(password !== confirmPassword){
            this.setState({errors: [{
                    field: 'Password',
                    msg: 'Passwords do not match'
                }]
            });

            return;
        }

        const userResponse = await register({ email, username, password, adminCode });

        if(userResponse.user){
            window.location.reload();
        } 
        
        else{
            this.setState({errors: userResponse.errors});
        }
    }

    render(){
        const { email, username, password, confirmPassword, adminCode, showAdmin, errors } = this.state;

        return(
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    
                    <label htmlFor='email'>Email Address </label>
                    <input
                        id='email'
                        type='text'
                        value={email}
                        onChange={this.handleChange}
                        placeholder='Email...'
                        required
                    />
                    
                    <label htmlFor='username'>Enter Username </label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        onChange={this.handleChange}
                        placeholder='Username...'
                        required
                    />
                    
                    <label htmlFor='password'>Password </label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={this.handleChange}
                        placeholder='Password...'
                        required
                    />

                    <label htmlFor='confirmPassword'>Confirm Password </label>
                    <input
                        id='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        placeholder='Confirm password...'
                        required
                    />

                    {showAdmin && (
                        <div>
                            <label htmlFor='adminCode'>Admin Code</label>
                            <input
                                id='adminCode'
                                type='password'
                                value={adminCode}
                                onChange={this.handleChange}
                                placeholder='Admin code'
                                required
                            />
                        </div>
                    )}
                    
                    <div className = 'text-center'>
                        <button className='btn btn-primary'>
                            Register
                        </button>
                    </div>

                    <p className='text-white mt-3' onClick={this.toggleAdmin}>
                        {showAdmin? 'Sign up as user?' : 'Sign up as admin?'}
                    </p>

                    <div className='errors mt-3'>
                        {errors.map((err, i) => 
                            <div key={i}>
                                {`${err.field} error: ${err.msg}`}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;