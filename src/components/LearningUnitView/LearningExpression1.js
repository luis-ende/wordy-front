import React from 'react';

import Typography from '@mui/material/Typography';

const learningExpression1 = (props) => {
  return (
    <Typography component="h5" variant="h5">
      {props.expression ? props.expression : '(none)'}
    </Typography>
  );
};

export default learningExpression1;
