import React from 'react';
import { Route } from "react-router-dom";
import './App.css';

import {NavBar} from './components/NavBar';
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Register} from './components/Register';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Route exact path="/">
        <Login />
      </Route>
      
      <Route path="/register">
        <Register />
      </Route>

      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </div>
  );
}

export default App;
