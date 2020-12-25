import React from 'react';
import DeleteUser from './DeleteUser.jsx';
import UsernameForm from './UsernameForm';
import ChangePasswordForm from './ChangePasswordForm';
import './css/Setting.css'

function Setting(){
    return(
        <div className='settings'>
            <h1>Settings </h1>
            <DeleteUser />
            <UsernameForm/>
            <ChangePasswordForm/>
        </div>
    )
};
export default Setting;