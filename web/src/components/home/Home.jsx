import React from 'react';
import './css/Home.css';


function Home({history}){
    const goToProducts = () => {
        history.push('/products/all');
    }
    return(
        <div className = 'home'>
            <h1>Shop across departments.</h1>
            <h2>Message Customers.</h2>
            <h3>Upload your products.</h3>

            <div className = "box-2">
            <div className ="btn btn-two">
                <span onClick={goToProducts}>Peeps The Products</span>
            </div>
            </div>
            

            <p>Copyright © 2021 eLeet Coderz</p>
        </div>
    )
}

export default Home;
