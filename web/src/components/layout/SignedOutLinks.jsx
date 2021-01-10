import React from 'react';
import { Link } from 'react-router-dom';
import './css/SignedOutLinks.css';

function SignedOutLinks(){
    return (
        <ul className="signed-out navbar-nav ml-auto">
            <li>
                <Link to="/login" className="nav-link mr-5">
                    <i className='fas fa-user'/>
                    <span className='ml-3'>Login</span>
                </Link>
            </li>
                                
            <li>
                <Link to="/register" className="nav-link">
                    <i className='fas fa-pencil-alt'/>
                    <span className='ml-3'>Register</span>
                </Link>
            </li>
        </ul>
    )
}

export default SignedOutLinks;