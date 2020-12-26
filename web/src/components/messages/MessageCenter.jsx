import React, { Component } from 'react';
import './css/MessageCenter.css';

class MessageCenter extends Component{
    render(){
        return(
            <div className='messageCenter'>
                <div className='userBoardIntro'>
                        <i class="fas fa-users"></i>
                </div>
                <h1>Message Center</h1> 
                
                <hr/>

                <div className='messageBox'>
                    <div className='oldConvos container-fluid col-5'>
                        <h2> USer</h2>
                        <h2> USer</h2>
                        <h2> USer</h2>
                        <h2> USer</h2>
                        <h2> USer</h2>
                    </div>        
                    <div className='activeConvo container-fluid col-7'>
                        <p>yo bud</p>
                        <p>yo bud</p>
                        <p>yo bud</p>
                        <p>yo bud</p>
                        <p>yo bud</p>
                        <p>yo bud</p>
                    </div> 
                </div>
                
                <div className='userBoardEnd'>
                        <i class="fas fa-users"></i>
                </div>
                               
            </div>
        )
    }
}

export default MessageCenter;