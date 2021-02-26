import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';
import { green } from '@material-ui/core/colors';

const ExpressionIsLearning = (props) => {
  const handleIsLearningClick = () => {
    props.onIsLearningToggle(props.id);
  }

  return (
    <Tooltip title="Mark as (not) learned">
      <IconButton edge="end" aria-label="learning" onClick={handleIsLearningClick}>
        <CheckCircleIcon
          style={!props.isLearning ? { color: "secondary" } : { color: green[500] } } />
      </IconButton>
    </Tooltip>
  );
}

export default ExpressionIsLearning;
