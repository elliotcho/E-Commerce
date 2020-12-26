import React, { Component } from 'react';
import Sidebar from './Sidebar';
import './css/MessageCenter.css';

class MessageCenter extends Component{
    render(){
        return(
            <div className='message-center'>
                <Sidebar />      

                <div>
                    Container
                </div>    
            </div>
        )
    }
}

export default MessageCenter;