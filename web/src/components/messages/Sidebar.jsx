import React from 'react';
import './css/Sidebar.css';

function MessageCard(){
    return(
        <div className='p-4' style={{border: '1px solid black', cursor: 'pointer'}}>
            <h3>HELLO</h3>

            <div className='row'>
                <div className='col-9'>
                    <p>1234567890123456789012345</p>
                </div>

                <div className='col-3'>
                    <span>3y</span>
                </div>
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