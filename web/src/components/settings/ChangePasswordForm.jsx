import React, {Component} from 'react';
import { createErrorToast, createSuccessToast } from '../../utils/createToast';
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

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault(e);

        const{ currPassword, newPassword, confirmPassword } = this.state;
        const data = { currPassword, newPassword, confirmPassword };
       
        if(newPassword === confirmPassword){
            const { msg, error } = await changePassword(data);

            if(error){
                createErrorToast(msg);
            } else {
                createSuccessToast(msg);

                this.setState({
                    currPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } 
        
        else{
            createErrorToast("Passwords do not match");
        }
    }

    render(){
        const { currPassword, newPassword, confirmPassword } = this.state;
        
        return(
            <form className='change-password my-3 mx-auto' onSubmit={this.handleSubmit}>
                    <h3 className='mb-3 text-center'>
                        Change My Password
                    </h3>

                    <label htmlFor='current-password'>Current Password<span> *</span></label>
                    <input 
                        id='currPassword'
                        className='form-control'
                        placeholder='Current Password...'
                        type='password'
                        onChange={this.handleChange}
                        value={currPassword}
                    />

                    <label htmlFor='newPassword'>New Password<span> *</span></label>
                    <input 
                        id='newPassword'
                        className='form-control'
                        placeholder='New Password...'
                        type="password"
                        onChange = {this.handleChange}
                        value = {newPassword}
                    />

                    <label htmlFor="confirm-password">Confirm New Password<span> *</span></label>
                    <input 
                        id='confirmPassword'
                        className='form-control'
                        placeholder='Confirm New Password...'
                        type="password"
                        onChange={this.handleChange}
                        value={confirmPassword}
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