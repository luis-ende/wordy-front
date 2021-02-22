import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const LerningControls = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <IconButton onClick={props.onPrevious} aria-label="previous">
        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
      </IconButton>
      <IconButton aria-label="play/pause">
        <PlayArrowIcon className={classes.playIcon} />
      </IconButton>
      <IconButton onClick={props.onNext} aria-label="next">
        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
      </IconButton>
    </div>
  );
};

export default LerningControls;
