import React from 'react';
import './css/Home.css';


function Home({history}){
    const goToProducts = () => {
        history.push('/products/all');
    }
    const goToMessages = () => {
        history.push('/chat');
    }
    const goToUpload = () => {
        history.push('/create_product');
    }
    const goToRegister = () => {
        history.push('/register');
    }
    return(
        <div className = 'home img-responsive'>
            <h1>Shop across departments.</h1>
            <h2>Directly Message Sellers</h2>
            <h3>Upload your products.</h3>

            <div class="box-2">
                <div class="btn btn-two">
                    <span onClick={goToProducts}>Peeps The Products</span>
                </div>
            </div>

            
            <div className='row'>
                
                <div class="hexagon-wrapper">
                    <div class="hexagon">
                        <i onClick={goToMessages}>Message Customers</i>
                    </div>
                    </div>
                    <div class="hexagon-wrapper">
                    <div class="hexagon">
                        <i onClick={goToUpload}>Upload a Product</i>
                    </div>
                    </div>
                    <div class="hexagon-wrapper">
                    <div class="hexagon">
                        <i onClick={goToRegister}>Create An Account</i>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Home;
