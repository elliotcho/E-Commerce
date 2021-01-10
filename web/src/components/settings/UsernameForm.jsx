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

        const { newName } = this.state;
        
        await changeUsername(newName);       
    }

    render(){
        const{ newName } = this.state;
        
        return(
            <form className="change-username my-3 mx-auto" onSubmit={this.handleSubmit}>
                <h3 className='mb-3 text-center'>
                    Change Username 
                </h3>
                
                <label htmlFor="newName">New Username<span> *</span></label>
                <input 
                    id='newName'
                    className='form-control' 
                    type="text"
                    onChange={this.handleChange}
                    value={newName}
                    required
                />
    
                <div className = 'text-center'>
                    <button className='btn btn-success'>
                        CHANGE
                    </button>
                </div>
            </form>
        )
    }
}
export default UsernameForm;