import React, { useContext }from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import DeleteUser from './DeleteUser.jsx';
import UsernameForm from './UsernameForm';
import ChangePasswordForm from './ChangePasswordForm';
import './css/Setting.css';

const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

function Settings(){
    const { isDark, toggleTheme } = useContext(ThemeContext);

    const style = (isDark) ? darkStyle: lightStyle;

    return(
        <div className='settings' style={style}>
            <header className='row my-5 mx-auto'>
                <div className='col-9'>
                    <h1>Settings </h1>
                </div>

                <div className='col-3'>
                    <button onClick={toggleTheme}>
                        {isDark? 'Light mode' : 'night mode'}
                    </button>
                </div>
            </header>

            <UsernameForm/>
            <ChangePasswordForm/>
            <DeleteUser />
        </div>
    )
};
export default Settings;