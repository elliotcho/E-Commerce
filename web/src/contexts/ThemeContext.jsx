import React, { useState, createContext } from 'react';
export const ThemeContext = createContext();

function ThemeContextProvider({ children }){
    const cached = !!localStorage.getItem('isDark');
    
    const [isDark, changeTheme] = useState(cached);

    const toggleTheme = () => {
        //if true
        if(!isDark){
            localStorage.setItem('isDark', !isDark);
        } else{
            localStorage.setItem('isDark', '');
        }

        changeTheme(!isDark);
    }

    return(
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;