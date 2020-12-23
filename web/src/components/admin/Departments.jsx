import React, {Component} from 'react';
import {getAllDepartments, removeDepartment} from '../../api/departments';
import DepartmentForm from './DepartmentForm';

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
                <div className='p-4'>
                    {departments.map((d) =>
                        <div key ={d._id}>
                            {d.name}
                            <button onClick = {() => this.deleteDepartment(d._id)}> X
                            </button>
                        </div>
                    )}
                </div>

                <DepartmentForm addNewDepartment = {this.addNewDepartment}/>
            </div>
        )
    }
}

export default Departments; 