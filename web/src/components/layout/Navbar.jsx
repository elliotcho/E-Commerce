import React from 'react';
import decode from 'jwt-decode';
import { withRouter, Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import './css/Navbar.css';

function Navbar(){
    const logout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        window.location.href = '/';
    }

    let signedIn = false;
    let isAdmin = false;

    try { 
        const token = localStorage.getItem('token');
        const { user } = decode(token);

        signedIn = user._id;
        isAdmin = user.isAdmin;
    } catch (err) { }

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
                         (<ul className="navbar-nav ml-auto">
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
                        </ul>) : 
                        (<ul className="navbar-nav ml-auto">
                            <li>
                                <Link to="/profile" className="nav-link mr-5">
                                    <i className ='fas fa-address-card' />
                                    <span className='ml-3'>Profile</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link to="/create_product" className="nav-link mr-5">
                                    <i className='fa fa-upload'/>
                                    <span className='ml-3'>Upload Product</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/cart" className="nav-link mr-5">
                                    <i className='fas fa-shopping-cart'/>
                                    <span className='ml-3'>Cart</span>
                                </Link>
                            </li>

                            
                            {isAdmin && (
                                <li>
                                    <Link to="/departments" className="nav-link mr-5">
                                        <i className ='fas fa-shield-alt'/>
                                        <span className='ml-3'>Admin</span>
                                    </Link>
                                </li>
                            )}

                            <li>
                                <Link to="/settings" className="nav-link mr-5">
                                    <i className='fas fa-cog' />
                                    <span className='ml-3'>Settings</span>
                                </Link>
                            </li>
                                
                            <li>
                                <Link to="/" className="nav-link" onClick={logout}>
                                    <i className ='fas fa-sign-out-alt'/>
                                    <span className='ml-3'>Sign Out</span>
                                </Link>
                            </li>
                        </ul>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)