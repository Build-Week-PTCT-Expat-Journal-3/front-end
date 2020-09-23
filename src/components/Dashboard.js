import React, { useState, useEffect } from "react";
import {Posts} from "./Posts";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = () => {
      //get request
      //add the token to the authorization header
      //filter data
      const token = window.localStorage.getItem("token");
      axiosWithAuth()
        .get("/story")
        .then((response) => {
          setPosts(response.data);
        })
        .catch((err) => console.log(err));
    };
    getPost();
  }, [setPosts]);

  return (
    <div>
      Dashboard
      <br />
      <br />
      {posts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Dashboard;
