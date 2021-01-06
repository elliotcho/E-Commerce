import React from 'react';
import tiger from "../../images/tiger.jpg";
import './css/Home.css';

function Home(){
    return(
        <div className = 'home'>
            <div id="bg">
                 <img src={tiger} alt=''/>
            </div>
        </div>
    )
}

export default Home;