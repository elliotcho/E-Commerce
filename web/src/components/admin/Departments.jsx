import React, {Component} from 'react';
import {getAllDepartments} from '../../api/departments';
import DepartmentForm from './DepartmentForm';

class Departments extends Component{
    constructor(){
        super();

        this.state = {
            departments: []
        }

        this.addNewDepartment = this.addNewDepartment.bind(this);
    }

    async componentDidMount(){ 
        const departments = await getAllDepartments();
        this.setState({ departments });
    }

    addNewDepartment(newDept){ 
        const { departments } = this.state;
       
        departments.push(newDept);

        this.setState({ departments });
    }

    render(){
        const { departments } = this.state;

        return(
            <div>
                <div className='p-4'>
                    {departments.map((d, i) =>
                        <p key ={i}>
                            {d.name}
                        </p>
                    )}
                </div>

                <DepartmentForm addNewDepartment = {this.addNewDepartment}/>
            </div>
        )
    }
}

export default Departments; 