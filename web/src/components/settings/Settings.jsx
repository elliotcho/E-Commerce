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
                <div className='col-7'>
                    <h1>Settings </h1>
                </div>

                <div className='col-5 mt-3'>
                    <div className="theme-switch-wrapper">
                        <label className="theme-switch" htmlFor="checkbox">
                            <input type="checkbox" id="checkbox" onClick={toggleTheme}/>
                            <div className="slider round"></div>
                        </label>
                        
                        <em className='ml-3 mb-2'>
                            {isDark? 'Dark Mode': 'Light Mode'}
                        </em>
                    </div>
                </div>
            </header>

            <UsernameForm/>
            <ChangePasswordForm/>
            <DeleteUser />
        </div>
    )
};
export default Settings;