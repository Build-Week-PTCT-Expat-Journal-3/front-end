import React, {useState, useEffect, createContext} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';

import {PrivateRoute} from "./utils/PrivateRoute";
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Register} from './components/Register';
import {Profile} from './components/Profile';
import { axiosWithAuth } from './utils/axiosWithAuth';
import { NavBar } from './components/NavBar';

export const GlobalContext = createContext();

function App() {
  const [isLogged, setLoggedState] = useState(false);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const getData = () => {
      axiosWithAuth()
        .get("/story")
        .then((response) => {
          console.log(response, "stories");
          setPosts(response.data);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

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
    <GlobalContext.Provider value={{isLogged, setLoggedState, posts, setPosts}}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/protected" />
          </Route>
          <Route exact path="/navbar" component={NavBar}/>
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