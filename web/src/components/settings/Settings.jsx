import React from 'react';
import DeleteUser from './DeleteUser.jsx';
import UsernameForm from './UsernameForm';
import ChangePasswordForm from './ChangePasswordForm';
import './css/Setting.css'

function Settings(){
    return(
        <div className='settings'>
            <h1 className='text-center my-3'>
                Settings 
            </h1>
        
            <UsernameForm/>
            <ChangePasswordForm/>
            <DeleteUser />
        </div>
    )
};
export default Settings;