import React from 'react';

//import { makeStyles } from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

/* const useStyles = makeStyles((theme) => ({
  playIcon: {
    height: 38,
    width: 38,
  },
})); */

const LerningControls = (props) => {
  //const classes = useStyles();

  return (
    <div>
      <IconButton onClick={props.onPrevious} aria-label="previous">
        <SkipPreviousIcon />
      </IconButton>
      <IconButton aria-label="play/pause">
        <PlayArrowIcon />
      </IconButton>
      <IconButton onClick={props.onNext} aria-label="next">
        <SkipNextIcon />
      </IconButton>
    </div>
  );
};

export default LerningControls;
