import React, { Component } from 'react';
import './css/Profile.css';

class Profile extends Component{
    render(){
        return(
            <div className='profile'>
                <i class="fas fa-user-astronaut"></i>
                <h3>Master Elliot</h3>

                <section className='container-fluid'>
                    <div className='row'>
                        <div className='stats col-3'>
                            <h2>Personal Stats</h2>
                            <p># of Products Posted: </p>
                            <p>Successful Sales: </p>
                            <p>Average Rating: </p>
                        </div>
                        <div className='posts col-9'>
                            <h2>hella products</h2>
                            <h2>hella products</h2>
                            <h2>hella products</h2>
                            <h2>hella products</h2>
                            <h2>hella products</h2>
                            <h2>hella products</h2>
                            <h2>hella products</h2>
                            <h2>hella products</h2>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Profile;