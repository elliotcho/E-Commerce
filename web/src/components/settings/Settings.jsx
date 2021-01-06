import React, { useContext }from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import DeleteUser from './DeleteUser.jsx';
import UsernameForm from './UsernameForm';
import ChangePasswordForm from './ChangePasswordForm';
import {DarkModeSwitch} from 'react-toggle-dark-mode';
import './css/Setting.css';


const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };
const defaultProperties = {
    dark: {
      circle: {
        r: 9,
      },
      mask: {
        cx: '50%',
        cy: '23%',
      },
      svg: {
        transform: 'rotate(40deg)',
      },
      lines: {
        opacity: 0,
      },
    },
    light: {
      circle: {
        r: 5,
      },
      mask: {
        cx: '100%',
        cy: 0,
      },
      svg: {
        transform: 'rotate(90deg)',
      },
      lines: {
        opacity: 1,
      },
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

function Settings(){
    const { isDark, toggleTheme } = useContext(ThemeContext);
    let checked = false;
    const{isDarkMode, setDarkMode} = React.useState(false);
    const toggleDarkMode = (checked) =>{
        setDarkMode(checked);
    };
    const style = (isDark) ? darkStyle: lightStyle;

    return(
        <div className='settings' style={style}>
            <header className='row my-5 mx-auto'>
                <div className='col-9'>
                    <h1>Settings </h1>
                </div>
                
                <div className='col-3'>
                   <DarkModeSwitch
                    style={{marginBottom: '2rem'}}
                    checked= {isDarkMode}
                    onChange={toggleDarkMode}
                    size={120}
                    animationProperties={defaultProperties}
                    />
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