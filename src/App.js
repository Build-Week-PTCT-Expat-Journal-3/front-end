import React from 'react';
import {  BrowserRouter, Route, Switch, Redirect  } from "react-router-dom";
import './App.css';
import PrivateRoute from "./utils/PrivateRoute";
import {NavBar} from './components/NavBar';
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Register} from './components/Register';
import {Profile} from './components/Profile';
import { GlobalProvider } from './contexts/GlobalState';

function App() {
  return (
 <>
 <GlobalProvider>
      <NavBar />

    <BrowserRouter>

        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>

          <Route exact path="/login" component={Login} />

          <Route exact path="/register" component={Register} />


          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          <Route exact path="/profile" component={Profile}/>
        </Switch>
        </BrowserRouter>
      </GlobalProvider>
</>
  );
}

export default App;
