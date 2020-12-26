import React from 'react';
import { deleteAccount } from '../../api/user';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './css/DeleteUser.css';

function DeleteUser(){
    const handleClick = async() => {

        const confirmDelete = async() => {
            await deleteAccount();
            
            window.localStorage.clear();
            window.location.href ='/';
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
        <div className="delete-user my-3 mx-auto text-center">
            <button onClick= {handleClick} className="btn btn-danger">
                DELETE ACCOUNT
            </button>
        </div>
    )
}

export default DeleteUser;