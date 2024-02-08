import React from 'react';

//import { makeStyles } from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';

/* const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
}); */

const ProgressMark = (props) => {
  //const classes = useStyles();
  let total = props.total ?? '0';
  return (
    <Typography 
      //className={classes.title} 
      color="textSecondary" 
      gutterBottom
      >
      Learning {props.progress} of {total}
    </Typography>
  );
};

export default ProgressMark;
