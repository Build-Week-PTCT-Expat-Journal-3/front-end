import React from 'react';
import {Link} from 'react-router-dom';

export const NavBar = () => {
    return (
        <div>
            NavBar

            <Link to='/'>Login</Link>
            <Link to='/register'>Sign Up</Link>
            <Link to='/dashboard'>Home</Link>
        </div>
    )
}