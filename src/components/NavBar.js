import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {GlobalContext} from "../App";

import Button from '@material-ui/core/Button';

export const NavBar = () => {
    const {push} = useHistory();
    const {isLogged, setLoggedState} = useContext(GlobalContext)

    return isLogged ? (
      <nav>
        <div>
          <h1>Expat Journal</h1>
        </div>
        <div>
          <Link to={"/profile"}>
            <Button variant="contained" color="primary">
              Profile
            </Button>
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              setLoggedState(false);
              push("/");
            }}
            to={"/login"}
          >
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          </Link>
        </div>
      </nav>
    ) : (
      <nav>
        <div>
          <Link to={"/register"}>Register</Link>
        </div>
        <br />
        <div>
          <Link to={"/login"}>Login</Link>
        </div>
      </nav>
    )
}