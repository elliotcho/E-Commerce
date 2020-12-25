import React, {Component} from 'react';
import {getAllDepartments, removeDepartment} from '../../api/departments';
import DepartmentForm from './DepartmentForm';
import './css/Departments.css';

class Departments extends Component{
    constructor(){
        super();

        this.state = {
            departments: []
        }

        this.deleteDepartment = this.deleteDepartment.bind(this);
    }

    async componentDidMount(){ 
        const departments = await getAllDepartments();
        this.setState({ departments });
    }

    async deleteDepartment(id){
        await removeDepartment(id);
        window.location.reload();
    }

    render(){
        const { departments } = this.state;

        return(
            <div className='p-4 departments-bg'>
                <DepartmentForm />

                <div className='departments mt-4'>
                    {departments.map((d, i) =>
                        <div key ={i} className='dept p-3'>
                            {d.name}

                            <i 
                                className='ml-2 fas fa-trash-alt' 
                                onClick={() => this.deleteDepartment(d._id)}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Departments; 