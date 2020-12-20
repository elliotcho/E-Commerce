import React, {Component} from 'react';
import {getAllDepartments} from '../../api/departments';


class Departments extends Component{
    constructor(){
        super();

        this.state = {
            departments: []
        }
    }

    async componentDidMount(){ 
        const departments = await getAllDepartments();
        this.setState({departments});
    }

    render(){
        console.log(this.state.departments);
        return(
            <div>

            </div>
        )
    }
}

export default Departments; 