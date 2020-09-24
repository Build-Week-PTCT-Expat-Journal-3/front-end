import React from "react";
import {PostForm} from './PostForm';
import {NavBar} from "./NavBar";

export const Dashboard = () => {


  return (
    <>
    <NavBar/>
    <div className='posts-and-form'>
<br/>
<br/>
<br/>
<br/>

      <PostForm />
      <br />
    </div>
    </>
  );
}