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
    const chats = [];

    return(
        <div className='side-bar'>
           {chats.length? 
                (
                    chats.map(c => 
                        <MessageCard />    
                    ) 
                ):
                (
                    <h2 className='text-white p-4'>
                        You have no messages
                    </h2>
                )
           }
        </div>
    )
}

export default Sidebar;