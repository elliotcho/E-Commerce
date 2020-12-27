import React, { useState, useEffect } from 'react';
import { getSidebarChats } from '../../api/message';
import loading from '../../images/loading.jpg';
import './css/Sidebar.css';

function MessageCard({content}){
    return(
        <div className='p-4 text-white msg-card'>
            <img
                src = {loading}
                alt = 'profile pic'
            />
            
            <div>
                <h3>HELLO</h3>

                <p>
                    {content}
                </p>
            </div>
        </div>
    )
}

function Sidebar(){
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setChats(await getSidebarChats());
        }

        fetchData();
    }, [])

    return(
        <div className='side-bar'>
           {chats.length? 
                (
                    chats.map(m => 
                        <MessageCard 
                            content = {m.content}
                        />    
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