import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { deleteAccount } from '../../api/user';
import { socket } from '../../App';
import './css/DeleteUser.css';

function DeleteUser(){
    const handleClick = async() => {
        const token = window.localStorage.getItem('token');

        const confirmDelete = async() => {
            await deleteAccount();

            socket.emit('DISCONNECT', { token });
            
            window.localStorage.clear();
            window.location.href ='/';
        }

        confirmAlert({
            title: 'E-Commerce',
            message: 'Are you sure you want to delete this account?',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => { return; }}
            ]
        });          
    }

    return(
        <div className="delete-user text-center">
            <button onClick= {handleClick} className="btn btn-danger">
                DELETE ACCOUNT
            </button>
        </div>
    )
}

export default DeleteUser;