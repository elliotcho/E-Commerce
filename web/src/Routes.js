import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import { 
  AdminRoute, 
  AuthenticatedRoute, 
  UnauthenticatedRoute 
} from './utils/protectRoutes';

import Navbar from './components/layout/Navbar';
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
import Settings from './components/settings/Settings';
import AdminHome from './components/admin/AdminHome';
import MessageCenter from './components/messages/MessageCenter';
import PaymentForm from './components/payments/PaymentForm';
import ReviewDetails from './components/reviews/ReviewDetails';
import History from './components/profile/History';

import { ToastContainer } from 'react-toastify';

function Routes() {
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
            <AuthenticatedRoute exact path='/chat/:userId?' component={MessageCenter}/>
            <AuthenticatedRoute exact path='/payment' component={PaymentForm}/>
            <Route exact path='/review/:id' component={ReviewDetails}/>
            <AuthenticatedRoute exact path='/history' component={History}/>
            <Route path='/' component={DeadPage}/> 
          </Switch>

          <ToastContainer />
        </BrowserRouter>
    );
}

export default Routes;