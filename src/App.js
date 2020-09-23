import React, {useState, useEffect, createContext} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';

import {PrivateRoute} from "./utils/PrivateRoute";
import {NavBar} from './components/NavBar';
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Register} from './components/Register';
import {Profile} from './components/Profile';

export const GlobalContext = createContext();

function App() {
  const [isLogged, setLoggedState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.setItem("logged", true);
      setLoggedState(true);
    } else if (localStorage.getItem("token") === null) {
      localStorage.setItem("logged", false);
      setLoggedState(false);
    }
  }, [isLogged, setLoggedState]);

  return (
    <GlobalContext.Provider value={{isLogged, setLoggedState}}>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/protected" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/protected" component={Dashboard} />
          <Route exact path="/profile" component={Profile}/>
        </Switch>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;