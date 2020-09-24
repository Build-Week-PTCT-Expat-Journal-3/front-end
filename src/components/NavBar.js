import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {GlobalContext} from "../App";


export const NavBar = () => {
    const {push} = useHistory();
    const {isLogged, setLoggedState} = useContext(GlobalContext)

    return isLogged ? (
        <nav>
        <div>
          <Link
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              setLoggedState(false);
              push("/");
            }}
            to={"/login"}
          >
            <div>Logout</div>
          </Link>
          <br />
          Profile
          <br />
          <br />
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