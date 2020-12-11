import React, {Component} from 'react';


class DepartmentForm extends Component {
    constructor(){
        super();

        this.state = {
            name: ''
        }
    }

    render(){
        <form className='department'>
            <label htmlFor='name'></label>
            <input 
            name= 'name'    
            type="text"
            />
        </form>
    }
}


export default DepartmentForm;