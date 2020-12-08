import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from './components/auth/ForgotPassword';
import changePassword from './components/auth/ChangePassword';
import ProductList from './components/products/ProductList';
import CreateProduct from './components/products/CreateProduct';
import ProductDetails from './components/products/ProductDetails';
import Profile from './components/profile/Profile';
import DeadPage from "./components/layout/DeadPage";
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  return (
    <div>
      
      <BrowserRouter>
        < Navbar />

        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/forgot_password' component={ForgotPassword}/>
          <Route exact path='/change_password/:token' component={changePassword}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/products/:dept' component={ProductList}/>
          <Route exact path='/product/:id' component={ProductDetails}/>
          <Route exact path='/create_product' component={CreateProduct}/>
          <Route path='/' component={DeadPage}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;