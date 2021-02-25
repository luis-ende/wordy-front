import React, { useEffect } from 'react';

import { useStore } from '../../hooks-store/store';
import axios from '../../axios-wordyapp';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LabelIcon from '@material-ui/icons/Label';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [secondary, setSecondary] = React.useState(true);
  const [error, setError] = React.useState(false);

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
    <ListItem key={exp.id}>
      <ListItemAvatar>
        <Avatar>
          <LabelIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={exp.textLanguage1}
        secondary={secondary ? exp.textLanguage2 : null}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Vocabulary List
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>
          { items }
        </List>
      </div>
    </div>
  );
}

export default ExpressionList;
