import React, {useState} from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '46%',
    minWidth: '46%',
    marginBottom: 30,
    boxShadow: '0 3px 5px 2px lightgrey',
  },
  root2: {
    maxWidth: '46%',
    minWidth: '46%',
    maxHeight: '400px',
    minHeight: '400px',
    marginBottom: 30,
    boxShadow: '0 3px 5px 2px lightgrey',
  },
  pos: {
    marginTop: 0,
  },
  input: {
    width: '97%',
    margin: theme.spacing(1),
  },
  inputtop: {
    width: '97%',
    margin: theme.spacing(1),
    marginTop: '10%',
  },
  input2: {
    width: '50%',
    marginLeft: '1.5%',
  },
  input3: {
    width: '45.5%',
    marginLeft: '1.5%',
  },
  button: {
    width: '90%',
    marginLeft: '5%',
    marginBottom: '5%',
  }
}));

export const Posts = (props) => {
  const { title, date, location, description, image_url, id } = props.post;
  const [edit, setEdit] = useState(!true);
  console.log(edit);
  console.log(image_url);
  const classes = useStyles();

  const [updateStory, setUpdateStory] = useState({
    title: title,
    date: date,
    location: location,
    description: description,
    image_url: image_url
  });
  console.log(updateStory);

  const deletePost = () => {
    axiosWithAuth()
      .delete(`/story/${id}`)
      .catch(err => console.log(err));
    setTimeout(function(){
      window.location.reload()}, 300);
  };

  const updatePost = () => {
    axiosWithAuth()
      .put(`/story/${id}`, updateStory)
      .then(res => {
        console.log(res);
        setTimeout(function(){ 
          window.location.reload(); }, 300);
      })
      .catch(err => console.log('Error: ', err));
  };

  const inputChange = (e) => {
    setUpdateStory({
      ...updateStory,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    {edit !== true && 
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Post Image"
            height="400"
            image={image_url}
            title="Post Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {location}
            </Typography>
            <Typography className={classes.pos} variant="body2" component="p">
              {title}
            </Typography>
            <Typography color="textSecondary">
              {date}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={() => setEdit(true)} size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="primary" onClick={deletePost}>
            Delete
          </Button>
        </CardActions>
      </Card>}
    {edit === true &&
      <form className={classes.root2} noValidate autoComplete="off">
        <TextField 
          id="outlined-basic" 
          className={classes.inputtop}
          label="Image Link" 
          variant="outlined" 
          name="image_url"
          onChange={inputChange}
          defaultValue={updateStory.image_url}
        />
        <TextField 
          id="outlined-basic" 
          className={classes.input}
          label="Location" 
          variant="outlined"
          name="location"
          onChange={inputChange}
          defaultValue={updateStory.location}
        />
        <br/>
        <TextField 
          id="outlined-basic" 
          className={classes.input2}
          label="Title" 
          variant="outlined"
          name="title"
          onChange={inputChange}
          defaultValue={updateStory.title}
        />
        <TextField 
          id="outlined-basic" 
          className={classes.input3}
          label="Date" 
          variant="outlined"
          name="date"
          onChange={inputChange}
          defaultValue={updateStory.date}
        />
        <br/>
        <TextField 
          id="outlined-basic" 
          className={classes.input}
          label="Describe Event" 
          variant="outlined" 
          name="description"
          onChange={inputChange}
          defaultValue={updateStory.description}
        />
        <br/>
        <Button 
          variant='contained' 
          color='primary' 
          className={classes.button}
          onClick={updatePost}
        >
          Save
        </Button>
      </form>}
    </>
  )
}