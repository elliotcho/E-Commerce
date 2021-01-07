import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCount } from '../../utils/formatCount';
import { getUnreadChats } from '../../api/message';
import { socket } from '../../App';
import './css/SignedInLinks.css';

const token = window.localStorage.getItem('token');

function SignedInLinks({ isAdmin }){
    const [unread, setUnread] = useState(0);

    const logout = (e) => {
        e.preventDefault();

        socket.emit('DISCONNECT', { token });
        socket.disconnect();

        window.localStorage.clear();
        window.location.href = '/';
    }

    useEffect(() => {
        const fetchData = async () => {
            setUnread(await getUnreadChats());
        }

        socket.on('READ_MESSAGES', () => fetchData());

        fetchData();
    }, []);

    const msgIcon = formatCount(unread) ? 'text-white' : '';

    return(
        <ul className="signed-in navbar-nav ml-auto">
            <li>
                <Link to="/cart" className="nav-link mr-5">
                    <i className='fas fa-shopping-cart'/>
                    <span className='ml-3'>Cart</span>
                </Link>
            </li>

            <li>
                <Link to="/create_product" className="nav-link mr-5">
                    <i className='fa fa-upload'/>
                    <span className='ml-3'>Upload Product</span>
                </Link>
            </li>

            <li>
                <Link to='/chat' className={`nav-link mr-5 ${msgIcon}`}>
                    <div className='icon-container'>
                        
                        <i className = "fas fa-comment"/>
                        <span className='ml-3'>Messages</span>

                        {unread === 0? null : 
                            (
                                <div className='count-box'>
                                    {formatCount(unread)}
                                </div>
                            )
                        }

                    </div>
                </Link>
            </li>

            <DropdownMenu isAdmin={isAdmin} logout={logout}/>
            <ExpandedLinks isAdmin={isAdmin} logout={logout}/>
        </ul>
    )
}

function ExpandedLinks({ isAdmin, logout }){
    return(
       <div className='expanded-links'>
            <li>
                <Link to="/profile" className="nav-link mr-5">
                    <i className ='fas fa-address-card' />
                    <span className='ml-3'>Profile</span>
                </Link>
            </li>
                
            {isAdmin && (
                <li>
                    <Link to="/admin" className="nav-link mr-5">
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
       </div>
    )
}

function DropdownMenu({ isAdmin, logout }){
    const [showDropdown, setShowDropdown] = useState(false);
    
    window.addEventListener('click', function(e){
        if(document.getElementById('expand').contains(e.target)){
            setShowDropdown(true);
        } else{
            setShowDropdown(false);
        }
    });

    const dropdownStyle = (showDropdown)? {display: 'block'} : {display: 'none'};

    return (                         
        <li className='dropdown-links'>
            <div className='nav-link' id='expand'>
                <i className = 'fas fa-plus' />
            </div>

            <div className='dropdown-content' style={dropdownStyle}>
                <section>
                    <div className='option'>
                        <Link to="/profile" className="nav-link mr-5">
                            <i className ='fas fa-address-card' />
                            <span className='ml-3'>Profile</span>
                        </Link>
                    </div>

                    {isAdmin && (
                        <div className='option'>
                            <Link to="/admin" className="nav-link mr-5">
                                <i className ='fas fa-shield-alt'/>
                                <span className='ml-3'>Admin</span>
                            </Link>
                        </div>
                    )}

                    <div className='option'>
                        <Link to="/settings" className="nav-link mr-5">
                            <i className='fas fa-cog' />
                            <span className='ml-3'>Settings</span>
                        </Link>
                    </div>

                    <div className='option'>
                        <Link to="/" className="nav-link" onClick={logout}>
                            <i className ='fas fa-sign-out-alt'/>
                            <span className='ml-3'>Sign Out</span>
                        </Link>
                    </div>
                </section>
            </div>
        </li>
    )
}

export default SignedInLinks;