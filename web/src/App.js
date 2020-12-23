import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import decode from 'jwt-decode';

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from './components/auth/ForgotPassword';
import changePassword from './components/auth/ChangePassword';
import Cart from './components/profile/Cart';
import ProductList from './components/products/ProductList';
import CreateProduct from './components/products/CreateProduct';
import ProductDetails from './components/products/ProductDetails';
import Profile from './components/profile/Profile';
import DeadPage from "./components/layout/DeadPage";
import Navbar from './components/layout/Navbar';
import Departments from './components/admin/Departments';
import './App.css';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  try { 
    decode(token);
    decode(refreshToken);
  } catch (err){
    return false;
  }

  return true;
}

const UnauthenticatedRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render = {props =>
      (!isAuthenticated() ? (
          <Component {...props} />
        ) :
        <Redirect
           to = {{
              pathname: '/'
           }}
        />  
      )
    }
  />
);

const AuthenticatedRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render = {props =>
      (isAuthenticated() ? (
          <Component {...props} />
        ) :
        <Redirect
           to = {{
              pathname: '/login'
           }}
        />  
      )
    }
  />
);

function App() {
  const signedIn = isAuthenticated();

  return (
      <BrowserRouter>
        < Navbar signedIn = {signedIn} />
        
        <Switch>
          <UnauthenticatedRoute exact path='/login' component={Login}/>
          <UnauthenticatedRoute exact path='/register' component={Register}/>
          <UnauthenticatedRoute exact path='/forgot_password' component={ForgotPassword}/>
          <UnauthenticatedRoute exact path='/change_password/:token' component={changePassword}/>
          <Route exact path='/profile/:uid?' component={Profile}/>
          <AuthenticatedRoute exact path='/cart' component={Cart}/>
          <Route exact path='/products/:dept/:query?' component={ProductList}/>
          <Route exact path='/product/:id' component={ProductDetails}/>
          <AuthenticatedRoute exact path='/create_product' component={CreateProduct}/>
          <Route exact path='/departments' component={Departments}/>
          <Route path='/' component={DeadPage}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;