import React, {Component} from 'react';
import { changePassword } from '../../api/auth'; 
import './css/ChangePassword.css';


class ChangePassword extends Component{
    constructor(){
        super();

        this.state = {
            newPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        
        const { newPassword } = this.state;
        const { token } = this.props.match.params;

        const user = await changePassword({ token, newPassword });
 
        if(user){
            window.location.reload();
        }
    }

    render(){
        const { newPassword } = this.state;

        return(
            <div className='change-pwd'>
                <form className='mx-auto' onSubmit={this.handleSubmit}>
                    <h1 className = 'mb-4'>
                        Change Password
                    </h1>
                    
                    <input
                        id='newPassword'
                        type='password'
                        value={newPassword}
                        onChange={this.handleChange}
                        placeholder='New password here...'
                    />

                    <button className='btn btn-success mt-3'>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default ChangePassword;