import React from 'react';
import { Link } from 'react-router-dom';

function SignedOutLinks(){
    return (
        <ul className="navbar-nav ml-auto">
            <li>
                <Link to="/login" className="nav-link mr-5">
                    Login
                </Link>
            </li>
                                
            <li>
                <Link to="/register" className="nav-link">
                    Signup
                </Link>
            </li>
        </ul>
    )
}

export default SignedOutLinks;