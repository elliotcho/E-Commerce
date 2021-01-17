import React, { useContext }from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Departments from './Departments';
import './css/AdminHome.css';

const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

function AdminHome(){
    const { isDark } = useContext(ThemeContext);

    const style = (isDark) ? darkStyle: lightStyle;

    return(
        <div className='admin' style={style}>
            <h1>Admin Home</h1>
            
            <hr /> 
            
            <Departments /> 
        </div>
    )
}

export default AdminHome;