import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {Posts} from "./Posts";

export const PostForm = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const [newStory, setNewStory] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image_url: ""
  });




  useEffect(() => {
    const getData = () => {
      const token = window.localStorage.getItem("token");
      axiosWithAuth()
        .get("/story")
        .then((response) => {
          console.log(response, "stories");
          setPosts(response.data);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, [setPosts, setNewStory]);

  const addPost = (newPost) => {
    axiosWithAuth()
      .post(`/story/${id}/story`, newPost)
      .then((res) => {
        console.log(res, "new post");
        setPosts([...posts, newPost]);
      });
  };

  const posting = (e) => {
    e.preventDefault();
    addPost(newStory);
  };

 
  const inputChange = (e) => {
    setNewStory({
      ...newStory,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div>
        <h4>ADD POST:</h4>
        <br></br>
        <br></br>
        <form onSubmit={posting}>
          <label>
            <input
              name="title"
              onChange={inputChange}
              type="text"
              placeholder="Title"
            />
          </label>
          <br></br>
          <br></br>
          <br></br>
          <label>
            <input
              name="date"
              onChange={inputChange}
              type="text"
              placeholder="Date"
            />
          </label>
          <br></br>
          <br></br>
          <br></br>
          <label>
            <input
              name="location"
              onChange={inputChange}
              type="text"
              placeholder="Location"
            />
          </label>
          <br></br>
          <br></br>
          <br></br>
          <label>
            <input
              name="description"
              onChange={inputChange}
              type="text"
              placeholder="Post"
            />
          </label>
          <br></br>
          <br></br>
          <br></br>
          <label>
            <input
              name="image_url"
              onChange={inputChange}
              type="text"
              placeholder="Image"
            />
          </label>
          <br></br>
          <br></br>
          <br></br>
          <button>Add Post</button>
          <br></br>
          <br></br>
        </form>
        <br></br>
        <br></br>
        <div>
          {posts.map((post) => (
            <Posts key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

