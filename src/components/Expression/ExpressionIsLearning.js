import React, { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';

const ExpressionIsLearning = (props) => {
  const [isLearning, setIsLearning] = useState(false);

  useEffect(() => {
    setIsLearning(props.isLearning);
  }, [props.isLearning]);

  return (
    <Tooltip title="Mark as (not) learned">
      <IconButton edge="end" aria-label="learning" onClick={props.onIsLearningToggle}>
        { isLearning ? <ScheduleIcon style={{ color: "secondary" }} /> : 
          <CheckCircleIcon style= {{ color: green[500] }} /> }
      </IconButton>
    </Tooltip>
  );
}

export default ExpressionIsLearning;
