import React, {Component} from 'react';
import { changePassword } from '../../api/auth'; 
import './css/ChangePassword.css';

class ChangePassword extends Component{
    constructor(){
        super();

        this.state = {
            newPassword: '',
            errors: []
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

        const { user, errors } = await changePassword({ token, newPassword });
 
        if(user){
            window.location.reload();
        } else{
            this.setState({ errors });
        }
    }

    render(){
        const { newPassword, errors } = this.state;

        return(
            <div className='change-pwd'>
                <form onSubmit={this.handleSubmit}>
                    <h1 className = 'mb-4'>
                        Change Password
                    </h1>
                    
                    <input
                        id='newPassword'
                        type='password'
                        onChange={this.handleChange}
                        placeholder='New password here...'
                        value={newPassword}
                    />

                    <button className='btn btn-success mt-3'>
                        Submit
                    </button>

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

export default ChangePassword;