import React from 'react';

import Typography from '@mui/material/Typography';

const learningExpression2 = (props) => (
  <Typography variant="subtitle1" color="textSecondary">
    {props.expression ? props.expression : '(none)'}
  </Typography>
);

export default learningExpression2;
