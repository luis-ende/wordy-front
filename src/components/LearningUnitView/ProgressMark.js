import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
});

const ProgressMark = (props) => {
  const classes = useStyles();
  let total = props.total ?? '0';
  return (
    <Typography className={classes.title} color="textSecondary" gutterBottom>
      Learning {props.progress} of {total}
    </Typography>
  );
};

export default ProgressMark;
