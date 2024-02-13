import React, { useEffect } from 'react';

import { useStore } from '../../hooks-store/store';
import axios from '../../axios-wordyapp';
import ExpressionItem from '../../components/Expression/ExpressionItem';
import LearningUnitSelectDialog from '../../components/LearningUnit/LearningUnitSelectDialog';

//import { makeStyles } from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/* const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
})); */

const ExpressionList = () => {
  //const classes = useStyles();
  const [state, dispatch] = useStore();
  const [dense] = React.useState(false);
  const [setError] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedExpression, setSelectedExpression] = React.useState(null);

  const handleMoreButtonClick = (event, expId) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpression(expId);
  };

  const handleMoreMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAssignLUClick = (event) => {
    setAnchorEl(null);
    setIsDialogOpen(true);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {    
    if (state.expressions.length === 0) {      
      axios.get( 'expressions.json' )
      .then( response => {
        const expressionsData = response.data;
        dispatch('SET_EXPRESSIONS', expressionsData);
      })
      .catch( error => {
        setError(true);
      }); 
    }
  });  

  const renderLearningUnitDialog = (
    <LearningUnitSelectDialog
      expression={selectedExpression}
      open={isDialogOpen}
      onClose={handleDialogClose}
    />
  );

  return (
    <Box maxWidth="sm" style={{marginLeft: "auto", marginRight: "auto", marginTop: "30px"}}>      
      <Typography variant="h6">
        Registered expressions:
      </Typography>
      <div>
        <List dense={dense}>
          { 
            state.expressions && state.expressions.map( exp => (
              <ExpressionItem
                key={exp.id}
                id={exp.id}
                textLanguage1={exp.textLanguage1}
                textLanguage2={exp.textLanguage2}
                onShowOptions={handleMoreButtonClick}
                isLearning={exp.isLearning}
                />
          ))}
        </List>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMoreMenuClose}
        >
          <MenuItem onClick={handleMoreMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuAssignLUClick}>Assign to learning unit</MenuItem>
          <MenuItem onClick={handleMoreMenuClose}>Go to dictionary</MenuItem>
        </Menu>
      </div>
      {renderLearningUnitDialog}
    </Box>
  );
}

export default ExpressionList;
