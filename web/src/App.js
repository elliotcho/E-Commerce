import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AuthContainer from './components/auth/AuthContainer';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from './components/auth/ForgotPassword';
import changePassword from './components/auth/ChangePassword';
import ProductDepartment from './components/products/ProductDeparment';
import CreateProduct from './components/products/CreateProduct';
import DeadPage from "./components/layout/DeadPage";
import './App.css';

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Switch>
          <Route exact path ='/auth/:page' component = {AuthContainer}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/forgot_password' component={ForgotPassword}/>
          <Route exact path='/change_password/:token' component={changePassword}/>
          <Route exact path='/product' component={ProductDepartment}/>
          <Route exact path='/create_product' component={CreateProduct}/>
          <Route path='/' component={DeadPage}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;