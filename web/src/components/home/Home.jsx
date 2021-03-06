import React from 'react';
import { decodeUser } from '../../utils/decodeUser';
import './css/Home.css';

function Home({ history }){
    const navigate = (route) => {
        history.push(route);
    }

    const user = decodeUser();

    return(
        <div className='home'>
            <h1>Shop across departments.</h1>
            <h2>Directly message sellers.</h2>
            <h3>Upload your products.</h3>

            <div onClick={() => navigate('/products/all')} className="wrapper">
                <div className="link_wrapper">
                    <a href="/products/all">Go to Products</a>

                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                            <path d={`M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 
                                      12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 
                                      12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 
                                      2.44 5.64 3.66 8.84 3.66s6.398-1.22 
                                      8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z`
                            }/>
                        </svg>
                    </div>
                </div>
            </div>
   
            {user && ( 
                <div className='row'>
                
                    <div className="hexagon-wrapper">
                        <div className="hexagon">
                            <i onClick={() => navigate('/chat')}>
                                Message Customers
                            </i>
                        </div>
                    </div>
                    
                    <div className="hexagon-wrapper">
                        <div className="hexagon">
                            <i onClick={() => navigate('/create_product')}>
                                Upload a Product
                            </i>
                        </div>
                    </div>
                        
                    <div className="hexagon-wrapper">
                        <div className="hexagon">
                            <i onClick={() => navigate('/profile')}>
                                Profile page
                            </i>
                        </div>  
                    </div>

                </div>
            )}

            {!user && ( 
                <div className='row'>
                    <div className="hexagon-wrapper">
                        <div className="hexagon">
                            <i onClick={() => navigate('/register')}>
                                Create an account
                            </i>
                        </div>
                    </div>
                        
                    <div className="hexagon-wrapper">
                        <div className="hexagon">
                            <i onClick={() => navigate('/login')}>
                                Already registered?
                            </i>
                        </div>
                    </div>
                        
                    <div className="hexagon-wrapper">
                        <div className="hexagon">
                            <i onClick={() => navigate('/forgot_password')}>
                                Forgot password?
                            </i>
                        </div>  
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default Home;