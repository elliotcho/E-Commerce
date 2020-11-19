import React, {Component} from 'react';
import './css/DeadPage.css';

class DeadPage extends Component{
    render(){
        return(
            <div className= 'deadpage'> 
                <h1> 404 </h1>
                <p>The Page You're Looking For Does Not Exist</p>
                <i class="fas fa-unlink"></i>


            <ul>
                <li>HOME</li>




                <li>|</li>




                <li>BACK</li>
            </ul>
            </div>

        )

    }


}


export default DeadPage;