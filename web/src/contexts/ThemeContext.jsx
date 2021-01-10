import React, { useState, createContext } from 'react';
export const ThemeContext = createContext();

const cached = !!localStorage.getItem('isDark');

function ThemeContextProvider({ children }){
    const [isDark, changeTheme] = useState(cached);

    const toggleTheme = () => {
        
        //we are turning on dark mode
        if(!isDark){
            localStorage.setItem('isDark', !isDark);
        } 
        
        //we are turning off dark mode
        else{
            localStorage.setItem('isDark', '');
        }

        changeTheme(!isDark);

    }

    return(
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;