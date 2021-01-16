import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'
import { withRouter } from 'react-router-dom';
import { createErrorToast } from '../../utils/createToast';
import * as userAPI from '../../api/user';
import Item from './Item';
import './css/History.css';

function History({ history }){
    const [shoppingHistory, setHistory] = useState([]);

    useEffect(() => {
        const { getHistory } = userAPI;

        const fetchData = async () => {
            setHistory(await getHistory());
        }

        fetchData();
    }, []);

    const removeFromHistory = (id) => {
        const { deleteHistoryItem } = userAPI;

        const confirmDelete = async () => {
            for(let i=0;i<shoppingHistory.length;i++){
                if(shoppingHistory[i]._id === id){
                    shoppingHistory.splice(i, 1);
                    break;
                }
            }

            await deleteHistoryItem(id);
            
            setHistory([...shoppingHistory]);
        }

        confirmAlert({
            title: 'E-Commerce',
            message: 'Are you sure you want to remove this item?',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => { return; }}
            ]
        });  
    }

    const clear = () => {
        if(shoppingHistory.length === 0) {
            createErrorToast('History is already cleared');
            return;
        }

        const confirmDelete = async () => {
            const { clearHistory } = userAPI;

            await clearHistory();

            setHistory([]);
        }

        confirmAlert({
            title: 'E-Commerce',
            message: 'Are you sure you want to clear history?',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => { return; }}
            ]
        });
    }

    const toCart = () => history.push('/cart');

    return(
        <div className='history'>
            <header className='text-center mt-5 mb-4'>
                <h2 className='mb-3'>
                    Shopping History
                </h2>

                <button className="btn btn-md btn-primary" onClick={clear}>
                    Clear Shopping History?
                </button>

                <p onClick={toCart}>
                    Go to cart
                </p>
            </header>

            <div className='items'>
                {shoppingHistory.map(i => {
                    const remove = () => { removeFromHistory(i._id) }

                    return (
                        <div key = {i._id} className = 'history-item'>
                            <Item 
                                productId = {i.productId}
                                datePurchased = {i.datePurchased}
                                quantity = {i.quantity}
                                remove = {remove}
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