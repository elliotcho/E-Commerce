import React from 'react';
import { Link } from 'react-router-dom';
import './css/DeadPage.css';

function DeadPage(props){
    const goBack = async (e) => {
        e.preventDefault();
        props.history.goBack();
    }

    return(
        <div className= 'dead-page text-center'> 
            <h1 className='mt-5'>404</h1>

            <p>
                The Page You're Looking For Does Not Exist
            </p>

            <i className = "fas fa-unlink mt-2"/>

            <ul className='text-center mr-3'>
                <Link to='/'>
                    <li>HOME</li>
                </Link>

                <li>|</li>

                <Link to='/' onClick={goBack}>
                    <li>BACK</li>
                </Link>
            </ul>
        </div>
    )
}

export default DeadPage;