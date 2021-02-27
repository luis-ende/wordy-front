import React, { useEffect, useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Tooltip from '@material-ui/core/Tooltip';
import { green } from '@material-ui/core/colors';

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
