import React from 'react';
import {Link} from 'react-router-dom';

import {PostForm} from './PostForm';
import {Posts} from './Posts';

export const Dashboard = () => {
    return (
        <div>
            Dashboard

            <Link to='/profile'>Go To Profile</Link>

            <PostForm />
            <Posts />
        </div>
    )
}