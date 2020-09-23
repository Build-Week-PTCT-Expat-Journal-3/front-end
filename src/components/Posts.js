import React from 'react';

export const Posts = (props) => {
    const { title, date, location, description, image_url } = props.post;

    return (
        <div>
             <div >{title}</div>
      <br></br>
      <br></br>
      <div >{date}</div>
      <br></br>
      <br></br>
      <div >{location}</div>
      <br></br>
      <br></br>
      <div >{description}</div>
      <br></br>
      <br></br>
      <div >
        <img src={image_url} alt="some random image that generated" />
      </div>
        </div>
    )
}