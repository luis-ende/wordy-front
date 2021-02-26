import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const LerningControls = (props) => {
  const classes = useStyles();

  return (
    <div>
      <IconButton onClick={props.onPrevious} aria-label="previous">
        <SkipPreviousIcon />
      </IconButton>
      <IconButton aria-label="play/pause">
        <PlayArrowIcon className={classes.playIcon} />
      </IconButton>
      <IconButton onClick={props.onNext} aria-label="next">
        <SkipNextIcon />
      </IconButton>
      <IconButton onClick={props.onNext} aria-label="learned">
        <CheckCircleIcon color="secondary" />
      </IconButton>
    </div>
  );
};

export default LerningControls;
