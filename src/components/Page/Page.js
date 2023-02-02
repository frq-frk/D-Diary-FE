import React from 'react'
import './page.css'
import { Typography } from '@mui/material';
import ImageFiller from '../fillers/ImageFiller';

const Page = React.forwardRef((props, ref) => {

  console.log(props.children)

  return (
    <div className="pageContainer" ref={ref}>
      {/* <h1>{props.date}</h1> */}
      {/* <p>{props.children}</p> */}
      <Typography variant="h3" component="h3">{props.heading}</Typography>
      { props.heading && <ImageFiller image={props.decor}/>}
      <Typography variant="body1" component="p"><pre>{props.children}</pre></Typography>
    </div>
  );
});

export default Page