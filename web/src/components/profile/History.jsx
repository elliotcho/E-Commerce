import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getHistory } from '../../api/user';
import Item from './Item';
import './css/History.css';

function History({ history }){
    const [shoppingHistory, setHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setHistory(await getHistory());
        }

        fetchData();
    }, []);

    const toCart = () => history.push('/cart');

    return(
        <div className='history'>
            <header className='text-center my-5'>
                <h3>Shopping History</h3>

                <p onClick={toCart}>
                    Go to cart
                </p>
            </header>

            <div className='items'>
                {shoppingHistory.map(i => {
                    const removeFromHistory = () => {alert(i.datePurchased);}

                    return (
                        <div key = {i._id} className = 'history-item'>
                            <Item 
                                productId = {i.productId}
                                datePurchased = {i.datePurchased}
                                quantity = {i.quantity}
                                remove = {removeFromHistory}
                                image = {i.image}
                                price = {i.price}
                                name = {i.name}
                                size = {i.size}
                            /> 
                        </div>
                    )     
                })}
            </div>
        </div>
    )
}

export default withRouter(History);