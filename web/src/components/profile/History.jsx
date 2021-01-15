import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getHistory } from '../../api/user';
import Item from './Item';
import './css/History.css';

const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

function History(){
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setHistory(await getHistory());
        }

        fetchData();
    }, []);

    const { isDark } = useContext(ThemeContext);

    const style = isDark? darkStyle: lightStyle;

    return(
        <div className='history' style={style}>
            <div className='items text-center'>
                {history.map(i => {
                    const removeFromHistory = () => {alert(i.datePurchased);}

                    return (
                        <Item 
                            key = {i._id}
                            productId = {i.productId}
                            datePurchased = {i.datePurchased}
                            quantity = {i.quantity}
                            remove = {removeFromHistory}
                            image = {i.image}
                            price = {i.price}
                            name = {i.name}
                            size = {i.size}
                        /> 
                    )     
                })}
            </div>
        </div>
    )
}

export default History;