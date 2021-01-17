import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { getAllDepartments, removeDepartment } from '../../api/departments';
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
        const confirmDelete = async () => {
            await removeDepartment(id);
            window.location.reload(); 
        }

        confirmAlert({
            title: 'E-Commerce',
            message: 'Are you sure you want to remove this department?',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => { return; }}
            ]
        });
    }

    render(){
        const { departments } = this.state;

        return(
            <div className='p-4'>
                <DepartmentForm />

                <div className='departments mt-4'>
                    {departments.map((d, i) => {
                        const onClick = () => this.deleteDepartment(d._id);
                        const className = 'ml-2 fas fa-trash-alt';

                        return (
                            <div key ={i} className='dept p-3'>
                                {d.name}

                                <span>
                                    <i className={className} onClick={onClick}/>
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Departments; 