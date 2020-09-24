import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {GlobalContext} from "../App";

import Button from '@material-ui/core/Button';

export const NavBar = () => {
    const {push} = useHistory();
    const {setLoggedState} = useContext(GlobalContext)

    return (
      <nav>
        <div>
          <h1>Expat Journal</h1>
        </div>
        <div>
          <a href='https://upbeat-liskov-426f57.netlify.app/'>
            <Button variant="contained" color="primary">
              Profile
            </Button>
          </a>
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
    )
}