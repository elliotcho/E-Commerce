import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;