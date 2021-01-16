import React, {Component} from 'react';
import { addDepartment } from '../../api/departments';
import './css/DepartmentForm.css';

class DepartmentForm extends Component {
    constructor(){
        super();

        this.state = {
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault();

        await addDepartment({name: this.state.name});

        window.location.reload();
    }

    render(){
        const { name } = this.state; 
        
        return(
            <form className='department-form' onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Add a Department: </label>
                <input 
                    name= 'name'
                    value= {name}
                    onChange= {this.handleChange}    
                    type="text"
                    required
                />
            
                <button className='btn'>Submit</button>
            </form>
        )
    }
}

export default DepartmentForm;