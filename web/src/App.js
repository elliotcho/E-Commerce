import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import { 
  AdminRoute, 
  AuthenticatedRoute, 
  UnauthenticatedRoute 
} from './utils/protectRoutes';

import Home from './components/home/Home';
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
import Settings from './components/settings/Settings';
import AdminHome from './components/admin/AdminHome';
import MessageCenter from './components/messages/MessageCenter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        < Navbar />
        
        <Switch>
          <Route exact path ='/' component={Home} />
          <UnauthenticatedRoute exact path='/login' component={Login}/>
          <UnauthenticatedRoute exact path='/register' component={Register}/>
          <UnauthenticatedRoute exact path='/forgot_password' component={ForgotPassword}/>
          <UnauthenticatedRoute exact path='/change_password/:token' component={changePassword}/>
          <Route exact path='/profile/:uid?' component={Profile}/>
          <AuthenticatedRoute exact path='/cart' component={Cart}/>
          <Route exact path='/products/:dept/:query?' component={ProductList}/>
          <Route exact path='/product/:id' component={ProductDetails}/>
          <AuthenticatedRoute exact path='/create_product' component={CreateProduct}/>
          <AuthenticatedRoute exact path='/settings' component={Settings}/>
          <AdminRoute exact path='/admin' component={AdminHome}/>
          <Route exact path='/messages' component={MessageCenter}/>
          <Route path='/' component={DeadPage}/> 
        </Switch>

        <ToastContainer style={{fontFamily: 'Trebuchet MS'}}/>
      </BrowserRouter>
  );
}

export default App;