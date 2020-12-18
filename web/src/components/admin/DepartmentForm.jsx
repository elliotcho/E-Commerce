import React, {Component} from 'react';
import { addDepartment } from '../../api/departments';


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
        const {name} = this.state;
        
        await addDepartment({name});
    }

    render(){
        const {name} = this.state; 
        return(
            <form className='department' onSubmit={this.handleSubmit}>
                <label htmlFor='name'></label>
                <input 
                    name= 'name'
                    value= {name}
                    onChange= {this.handleChange}    
                    type="text"
                    required
                />
                <button>Add department</button>
            </form>
        )
    }
}




export default DepartmentForm;