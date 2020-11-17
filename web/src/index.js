import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider as AlertProvider } from 'react-alert';
import Alert from './components/layout/Alert';

const AlertTemplate = ({style, options, message, close}) => (
  <Alert
     style = {style}
     options = {options}
     message = {message}
     colse = {close}
  />
);

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();