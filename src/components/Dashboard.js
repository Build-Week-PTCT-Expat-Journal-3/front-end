import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import {PostForm} from './PostForm';
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = () => {
      const token = window.localStorage.getItem("token");
      axiosWithAuth()
        .get("/story")
        .then((response) => {
        
          setPosts({...posts}, response.data);
        })
        .catch((err) => console.log(err));
    };
    getPost();
  }, [setPosts]);

  return (

    <div className='posts-and-form'>

      <Link to={"/protected"}>Dashboard</Link>
      <br />

      <PostForm />
      <br />
    </div>
  );
}