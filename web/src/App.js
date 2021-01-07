import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { fetchUser } from './utils/fetchUser';
import { API } from './constants';
import Routes from './Routes';
import Toast from './components/layout/Toast';
import { ToastContainer, toast } from 'react-toastify';
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

     socket.on('NEW_MESSAGE', async (data)  => {
        if(data){
            const { user: { username }, imgURL } = await fetchUser(data.sender);

            const props = { 
                content: data.content, 
                username, 
                imgURL 
            };

            toast.success(<Toast {...props} />, {
              position: toast.POSITION.BOTTOM_RIGHT,
              draggable: false
            });
        }
     });
  }

  render(){
      return(
          [
            <ToastContainer key={'toasts'} />,
            <Routes key={'routes'}/>
          ]
      )
  }
}

export { socket };
export default App;