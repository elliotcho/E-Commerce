import React, { useState, useEffect } from 'react';
import { getHistory } from '../../api/user';
import './css/History.css';

function History(){
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getHistory();
            setHistory(data.history);
        }

        fetchData();
    });

    return(
        <div className='history'>
            {history.map(p => 
                <div>
                    {p.productId} {new Date(p.datePurchased).toLocaleString()}
                </div>    
            )}
        </div>
    )
}

export default History;