import React from 'react';

import {PostForm} from './PostForm';
import {Posts} from './Posts'; 

export const Dashboard = () => {
    return (
        <div>
            Dashboard

            <PostForm />
            <Posts />
        </div>
    )
}