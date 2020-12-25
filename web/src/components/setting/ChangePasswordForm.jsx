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

        const{currPassword, newPassword, confirmPassword} = this.state;
        const data = {currPassword, newPassword, confirmPassword};
        //console.log(data);
        if(newPassword === confirmPassword){
            const msg = await changePassword(data);
            console.log(msg);
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
            <form className='change-password' onSubmit={this.handleSubmit}>
                    <h3>Change My Password</h3>

                    <label htmlFor='current-password'>Current Password<span>*</span></label>
                    <input 
                        id='currPassword'
                        type='password'
                        minLength='6'
                        maxLength='49'
                        onChange={this.handleChange}
                        value={currPassword}
                        required
                    />

                    <label htmlFor='newPassword'>New Password<span>*</span></label>
                    <input 
                        id='newPassword'
                        type="password"
                        minLength='6'
                        maxLength='49'
                        onChange = {this.handleChange}
                        value = {newPassword}
                        required
                    />

                    <label htmlFor="confirm-password">Confirm New Password<span>*</span></label>
                    <input 
                        id='confirmPassword'
                        type="password"
                        onChange={this.handleChange}
                        value={confirmPassword}
                        required
                    />

                    <br></br>
                    <button className='btn btn-danger'>
                        CHANGE
                    </button>
                </form>
        )
    }
}

export default ChangePasswordForm;