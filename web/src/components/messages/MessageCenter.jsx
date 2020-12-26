import React, { Component } from 'react';
import Sidebar from './Sidebar';
import './css/MessageCenter.css';

class MessageCenter extends Component{
    render(){
        return(
            <div className='messageCenter'>
                <Sidebar />            
            </div>
        )
    }
}

export default MessageCenter;