import React, {Component} from 'react';
import {changeUsername} from '../../api/user';
import './css/UsernameForm.css';

class UsernameForm extends Component{
    constructor(){
        super();
        this.state = {
            newName: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        const {newName} = this.state;
        const msg = await changeUsername(newName);
        console.log(msg);        
    }

    render(){
        const{newName} = this.state;
        return(
            <form className="change-username" onSubmit={this.handleSubmit}>
                <h3>Change Username </h3>
                <label htmlFor="newName">New Username<span>*</span></label>
                <input 
                    id='newName'
                    type="text"
                    minLength='4'
                    maxLength='30'
                    onChange={this.handleChange}
                    value={newName}
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
export default UsernameForm;