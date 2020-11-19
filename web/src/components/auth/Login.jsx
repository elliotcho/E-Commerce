import React, {Component} from 'react';
import './css/Login.css';

class Login extends Component{
    render(){
        return(
            <div className= 'login'>
                <h3>Login</h3>
                <form>
                    <input type='text' />

                    <input type='password' />

                    <button>Sign in</button>
                </form>
            </div>
        )
    }

}

export default Login;