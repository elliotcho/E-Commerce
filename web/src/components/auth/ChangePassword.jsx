import React, {Component} from 'react';
import { changePassword } from '../../routes/authRoutes';

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

        const user = await changePassword({token, newPassword});

        if(user){
            this.props.history.push('/');
        }
    }

    render(){
        const { newPassword } = this.state;

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        id='newPassword'
                        type='password'
                        value={newPassword}
                        onChange={this.handleChange}
                        placeholder='New password here...'
                    />

                    <button className='btn btn-success'>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default ChangePassword;