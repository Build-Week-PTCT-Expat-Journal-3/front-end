
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {Posts} from "./Posts";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {GlobalContext} from "../App"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '70ch',
    },
    width: '100%',
  },
  input: {
    width: '97%',
  },
  input2: {
    width: '53.314%',
  },
  input3: {
    width: '40%',
  },
  button: {
    width: '97%',
  }
}));

export const PostForm = () => {
  const { id } = useParams();
  const classes = useStyles();
  const {posts, setPosts} = useContext(GlobalContext);
  console.log(posts, "posts from post form")

  const addPost = (newPost) => {
    axiosWithAuth()
      .post(`/story/${id}/story`, newPost)
      .then((res) => {
        console.log(res, "new post");
        setPosts([...posts, newPost]);
        // setTimeout(function(){ window.location.href = window.location.href; }, 1000);
      });
  };   

  const posting = (e) => {
    e.preventDefault();
    addPost(newStory);
  };

  const [newStory, setNewStory] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image_url: ""
  });

  const inputChange = (e) => {
    setNewStory({
      ...newStory,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div>
        <h2>Add Post</h2>
        <form onSubmit={posting} className={classes.root} noValidate autoComplete="off">
          <TextField 
            id="outlined-basic" 
            className={classes.input}
            label="Image Link" 
            variant="outlined" 
            name="image_url"
            onChange={inputChange}
          />
          <TextField 
            id="outlined-basic" 
            className={classes.input}
            label="Location" 
            variant="outlined"
            name="location"
            onChange={inputChange}
          />
          <br/>
          <TextField 
            id="outlined-basic" 
            className={classes.input2}
            label="Title" 
            variant="outlined"
            name="title"
            onChange={inputChange}
          />
          <TextField 
            id="outlined-basic" 
            className={classes.input3}
            label="Date" 
            variant="outlined"
            name="date"
            onChange={inputChange}
          />
          <br/>
          <TextField 
            id="outlined-basic" 
            className={classes.input}
            label="Describe Event" 
            variant="outlined" 
            name="description"
            onChange={inputChange}
          />
          <br/>
          <Button 
            variant='contained' 
            color='primary' 
            className={classes.button}
            onClick={posting}
          >
            Post
          </Button>
        </form>
   
     
      </div>
      
      {posts.map((post) => (
            <Posts key={post.id} post={post} />
          ))}
    </>
  );
};