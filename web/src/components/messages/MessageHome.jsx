import React, { Component } from 'react';
import './css/MessageHome.css';

class MessageHome extends Component{
    render(){
        return(
            <div className='messageHome'>
                <h1>Message Home</h1> 

                <section className='container-fluid row'>
                    <div className='userBoard col-5'>
                        <i class="fas fa-users"></i>
                    </div>
                    <div className='messageBoard col-7'>
                        <form>
                            <input type='text'/>
                            
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}

export default MessageHome;