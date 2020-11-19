import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from './components/auth/ForgotPassword';
import changePassword from './components/auth/ChangePassword';

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/forgot_password' component={ForgotPassword}/>
          <Route exact path='/change_password/:token' component={changePassword}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;