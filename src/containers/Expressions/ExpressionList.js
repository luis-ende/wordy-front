import React, { useEffect } from 'react';

import { useStore } from '../../hooks-store/store';
import axios from '../../axios-wordyapp';
import ExpressionItem from '../../components/Expression/ExpressionItem';
import LearningUnitSelectDialog from '../../components/LearningUnit/LearningUnitSelectDialog';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
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
}));

const ExpressionList = () => {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [dense, setDense] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleMoreButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAssignLUClick = (event) => {
    setIsDialogOpen(true);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    axios.get( 'expressions.json' )
      .then( response => {
        const expressionsData = response.data;
        dispatch('SET_EXPRESSIONS', expressionsData);
      })
      .catch( error => {
        setError(true);
      });
  }, []);

  let items = state.expressions && state.expressions.map( exp => (
    <ExpressionItem
      key={exp.id}
      id={exp.id}
      textLanguage1={exp.textLanguage1}
      textLanguage2={exp.textLanguage2}
      onShowOptions={handleMoreButtonClick}
      isLearning={exp.isLearning}
       />
  ));

  const renderLearningUnitDialog = (
    <LearningUnitSelectDialog
      open={isDialogOpen}
      onClose={handleDialogClose}
    />
  );

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Registered expressions:
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>
          { items }
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
    </div>
  );
}

export default ExpressionList;
