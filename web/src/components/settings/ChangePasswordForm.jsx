import React, {Component} from 'react';
import { changePassword } from '../../api/user';
import './css/ChangePasswordForm.css';


class ChangePasswordForm extends Component{
    constructor(){
        super();

        this.state = {
            currPassword: '',
            newPassword: '',
            confirmPassword: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault(e);

        const{ currPassword, newPassword, confirmPassword } = this.state;
        const data = { currPassword, newPassword, confirmPassword };
       
        if(newPassword === confirmPassword){
            await changePassword(data);
        } else{
            alert("Passwords do not match!");
        }
        
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    render(){
        const {currPassword, newPassword, confirmPassword} = this.state;
        
        return(
            <form className='change-password my-3 mx-auto' onSubmit={this.handleSubmit}>
                    <h3 className='mb-3 text-center'>
                        Change My Password
                    </h3>

                    <label htmlFor='current-password'>Current Password<span> *</span></label>
                    <input 
                        id='currPassword'
                        className='form-control'
                        type='password'
                        minLength='6'
                        maxLength='49'
                        onChange={this.handleChange}
                        value={currPassword}
                        required
                    />

                    <label htmlFor='newPassword'>New Password<span> *</span></label>
                    <input 
                        id='newPassword'
                        className='form-control'
                        type="password"
                        minLength='6'
                        maxLength='49'
                        onChange = {this.handleChange}
                        value = {newPassword}
                        required
                    />

                    <label htmlFor="confirm-password">Confirm New Password<span> *</span></label>
                    <input 
                        id='confirmPassword'
                        className='form-control'
                        type="password"
                        onChange={this.handleChange}
                        value={confirmPassword}
                        required
                    />

                    <div className='text-center'>
                        <button className='btn btn-success'>
                            CHANGE
                        </button>
                    </div>
                </form>
        )
    }
}

export default ChangePasswordForm;