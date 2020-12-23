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

        this.addNewDepartment = this.addNewDepartment.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
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

    async deleteDepartment(id){
        const { departments } = this.state;

        for(let i=0; i<departments.length; i++){
            if(departments[i]._id === id){
                departments.splice(i, 1);
                break;
            }
        }

        await removeDepartment(id);
        this.setState({ departments });
    }

    render(){
        const { departments } = this.state;

        return(
            <div>
                <div className='departments p-4'>
                    <DepartmentForm addNewDepartment = {this.addNewDepartment}/>

                    {departments.map((d, i) =>
                        <div key ={i}>
                            {d.name}

                            <i 
                                className='fas fa-trash-alt' 
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