import React, { Component } from 'react';
import './css/MessageCenter.css';

class MessageCenter extends Component{
    render(){
        return(
            <div className='messageCenter'>
                <h1>Message Center</h1> 
                    <div className='userBoard'>
                        <i class="fas fa-users"></i>
                    </div>
                    <div className='messageBoard row'>
                        <div className='oldConvos col-5'>
                            <h2> USer</h2>
                            <h2> USer</h2>
                            <h2> USer</h2>
                            <h2> USer</h2>
                            <h2> USer</h2>
                        </div>        
                        <div className='activeConvo col-7'>
                            <p>yo bud</p>
                            <p>yo bud</p>
                            <p>yo bud</p>
                            <p>yo bud</p>
                            <p>yo bud</p>
                            <p>yo bud</p>

                        </div>                
                    </div>
            </div>
        )
    }
}

export default MessageCenter;