import React from 'react';
import loading from '../../images/loading.jpg';
import './css/Sidebar.css';

function MessageCard(){
    return(
        <div className='p-4 msg-card' style={{border: '1px solid black', cursor: 'pointer'}}>
            <img
                src = {loading}
                alt = 'profile pic'
            />
            
            <div>
                <h3>HELLO</h3>

                <p>
                    1234567890123456789012345
                </p>
            </div>
        </div>
    )
}

function Sidebar(){
    const arr = [1,2,3,4,5,1,1,1,1,1];

    return(
        <div className='side-bar'>
           {arr.map(i => <MessageCard />)}
        </div>
    )
}

export default Sidebar;