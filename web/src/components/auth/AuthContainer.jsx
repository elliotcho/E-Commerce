import React from 'react';
import Login from './Login';
import Register from './Register';
import './css/AuthContainer.css';

function AuthContainer(){
    return(
        <div className='auth'>
           
            <div className='panels-container d-flex align-items-center'>
                <div className='panel left-panel'>
                    <div className='content'>
                        <h3>New here?</h3>

                        <p>
                            Welcome!
                        </p>

                        <button>
                            Register Here
                        </button>
                    </div>
                </div>

                {/* <div className='panel right-panel'>
                    <div className='content'>
                        <h3>One of us?</h3>

                        <p>
                            Welcome back!
                        </p>

                        <button>
                            Sign In Here
                        </button>
                    </div>
                </div> */}
            </div>

            < Login />
        </div>
    )
}   

export default AuthContainer;