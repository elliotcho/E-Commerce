import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './css/Home.css';

function Home({ history }){
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

    const { isDark } = useContext(ThemeContext);
    let className;

    if(isDark){
        className = 'home dark';
    } else{
        className = 'home light';
    }

    return(
        <div className={className}>
            <h1>Shop across departments.</h1>

            <h2>Directly Message Sellers</h2>

            <h3>Upload your products.</h3>

            <div className="box-2">
                <div className="btn btn-two">
                    <span onClick={goToProducts}>Peeps The Products</span>
                </div>
            </div>

            
            <div className='row'>
                
                <div className="hexagon-wrapper">
                    <div className="hexagon">
                        <i onClick={goToMessages}>Message Customers</i>
                    </div>
                    </div>
                    <div className="hexagon-wrapper">
                    <div className="hexagon">
                        <i onClick={goToUpload}>Upload a Product</i>
                    </div>
                    </div>
                    <div className="hexagon-wrapper">
                    <div className="hexagon">
                        <i onClick={goToRegister}>Create An Account</i>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Home;
