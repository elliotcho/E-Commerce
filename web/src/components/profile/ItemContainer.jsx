import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import History from './History';
import Cart from './Cart';
import './css/ItemContainer.css';

const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

function ItemContainer({
    history: { location: { pathname } }
}){
    const { isDark } = useContext(ThemeContext);

    const style = (isDark) ? darkStyle : lightStyle;

    return (
        <div className='item-container' style={style}>
            
            {pathname === '/cart' ? 
                <Cart /> : <History />
            }
        </div>
    )
}

export default ItemContainer;