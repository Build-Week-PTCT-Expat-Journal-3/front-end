import React from "react";
import {Link} from 'react-router-dom';
import {PostForm} from './PostForm';


export const Dashboard = () => {


  return (

    <div className='posts-and-form'>

      <Link to={"/protected"}>Dashboard</Link>
      <br />

      <PostForm />
      <br />
    </div>
  );
}