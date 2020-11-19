import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DeadPage from "./components/layout/DeadPage";

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route path='/' component={DeadPage}/>

        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;