import React from 'react';
import Login from './Login';
import Register from './Register';
import './css/AuthContainer.css';

function AuthContainer(props){
    const  { page } = props.match.params;

    const toggleAuth = () => {
        if(page === 'login'){
            props.history.push('/auth/register')
        } else{
            props.history.push('/auth/login');
        }
    }

    if(page !== 'login'  && page !== 'register'){
        props.history.push('/ERROR');
    }

    return(
        <div className='auth'>
            <div className='sidebar text-center text-white'>
                <h3>
                    {page === 'login' ? "Don't have an account?" : "One of us?"}
                </h3>

                <p>
                    {page === 'login' ? 'Get started today!' : 'Sign in!'}
                </p>

                <button className='btn btn-secondary' onClick={toggleAuth}>
                    Click here!
                </button>
            </div>

            <div className ='content'>
                {page === 'login' ? (< Login />) : (< Register />)}
            </div>
        </div>
    )
}   

export default AuthContainer;