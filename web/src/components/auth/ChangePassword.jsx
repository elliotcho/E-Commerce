import React, {Component} from 'react';
import axios from 'axios';

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

        const config = {headers: {'content-type': 'application/json'}};

        const response = await axios.post('http://localhost:5000/api/user/change_password', {token, newPassword}, config);
        const { user } = response.data;
        
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