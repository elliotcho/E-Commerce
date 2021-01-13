import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { createMessageToast } from './utils/createToast';
import { API } from './constants';
import Routes from './Routes';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

//socket events
const JOIN_EVENT = 'JOIN';
const MESSAGE_NOTIFICATION_EVENT = 'MESSAGE_NOTIFICATION';

//socket config
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
       const data = { token };

       socket.emit(JOIN_EVENT, data);
       socket.on(MESSAGE_NOTIFICATION_EVENT, createMessageToast);
     }
  }

  componentWillUnmount(){
    socket.disconnect();
  }

  render(){
      return(
        <Routes />
      )
  }
}

export { socket };
export default App;