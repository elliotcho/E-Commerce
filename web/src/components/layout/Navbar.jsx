import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './css/Navbar.css'

function Navbar({ signedIn }){
    const logout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        window.location.href = '/';
    }

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
                    {!signedIn?
                         (<ul className="navbar-nav ml-auto">
                            <li>
                                <Link to="/login" className="nav-link mr-5">
                                    Login
                                </Link>
                            </li>
                                
                            <li>
                                <Link to="/register" className="nav-link mr-5">
                                    Signup
                                </Link>
                            </li>
                        </ul>) : 
                         (<ul className="navbar-nav ml-auto" onClick={logout}>
                            <li>
                                <Link to="/" className="nav-link mr-5">
                                    Logout
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