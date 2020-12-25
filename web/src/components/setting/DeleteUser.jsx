import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteAccount} from '../../api/user';
import './css/DeleteUser.css';

function DeleteUser(){
    const handleClick = async() => {

        const confirmDelete = async() => {
            const msg = await deleteAccount();
            console.log(msg);
        }
        confirmAlert({
            title: 'E-Commerce',
            message: 'Are you sure you want to delete this account',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => {return;}}
            ]
        });          
    }

    return(
        <div className="deleteUser">
            <h3>Delete Account</h3>

            <button onClick= {handleClick} className="btn btn-danger">
                DELETE
            </button>
            </div>
    )
}

export default DeleteUser;