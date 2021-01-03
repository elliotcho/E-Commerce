import React from 'react';
import { decodeUser } from '../../utils/decodeUser';
import { withRouter, Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './css/Navbar.css';

function Navbar(){
    const user  = decodeUser();

    const signedIn = user && user._id;
    const isAdmin = user && user.isAdmin;

    return(
        <nav className="navbar navbar-expand-lg navbar-dark fixed">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">
                    E-Commerce
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <Searchbar />

                    {!signedIn?
                        <SignedOutLinks /> : <SignedInLinks isAdmin={isAdmin} />
                    }
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)