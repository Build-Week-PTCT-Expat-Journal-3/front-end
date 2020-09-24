import React from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: '46%',
    minWidth: '46%',
    marginBottom: 30,
    boxShadow: '0 3px 5px 2px lightgrey',
  },
  pos: {
    marginTop: 0,
  },
});

export const Posts = (props) => {
  const { title, date, location, description, image_url, id } = props.post;
  const classes = useStyles();

  const deletePost = () => {
    axiosWithAuth()
      .delete(`/story/${id}`)
      .catch(err => console.log(err));
    setTimeout(function(){ window.location.href = window.location.href; }, 1000);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Post Image"
          height="400"
          image={image_url}
          title="Contemplative Reptile"
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
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary" onClick={deletePost}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}