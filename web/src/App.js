import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { API } from './constants';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const wsEndpoint = `${API}`;
let socket;

class App extends Component{
  constructor(){
     super();
     socket = socketIOClient(wsEndpoint);
  }

  componentDidMount(){
     const token = window.localStorage.getItem('token');

     if(token){
       socket.emit('JOIN', { token });
     }
  }

  render(){
      const toastFont = { fontFamily: 'Trebuchet MS' };

      return(
          [
            <ToastContainer key={'toasts'} style={toastFont}/>,
            <Routes key={'routes'}/>
          ]
      )
  }
}

export { socket };
export default App;