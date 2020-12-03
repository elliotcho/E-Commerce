import React, { Component } from 'react';

import './css/Profile.css';


class Profile extends Component{
    constructor(){
        super();


    }

    render(){
        return(
            <div className='profile'>
                <i class="fas fa-user-astronaut fa-4"></i>
                <h3>Master Elliot</h3>
            </div>
        )
    }
}

export default Profile;