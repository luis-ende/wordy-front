import React from 'react';

import { useStore } from '../../hooks-store/store';
import axios from '../../axios-wordyapp';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import LabelIcon from '@material-ui/icons/Label';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVert from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';

import ExpressionIsLearning from './ExpressionIsLearning';

const ExpressionItem = (props) => {
  const [secondary, setSecondary] = React.useState(true);
  const dispatch = useStore()[1];

  const handleClickDeleteButton = () => {
    let expressionId = props.id;
      axios.delete( `expressions/${expressionId}` )
      .then( response => {
        dispatch('DELETE_EXPRESSION', expressionId);
      })
      .catch( error => {
      });
  }

  const handleIsLearningToggle = () => {
    const updatedExpression = { 'isLearning': !props.isLearning };
    axios.patch( `expressions/${props.id}`, updatedExpression, {
       headers: { 'Content-Type': 'application/merge-patch+json' }
    } )
    .then( response=> {
      dispatch('TOGGLE_IS_LEARNING', props.id);
    }).catch( error => {
    });
  }

  return (
    <ListItem key={props.id}>
      <ListItemAvatar>
        <Avatar>
          <LabelIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.textLanguage1}
        secondary={secondary ? props.textLanguage2 : null}
      />
      <ListItemSecondaryAction>
        <ExpressionIsLearning
          id={props.id}
          isLearning={props.isLearning}
          onIsLearningToggle={handleIsLearningToggle} />
        <Tooltip title="Delete">
          <IconButton edge="end" aria-label="delete" onClick={handleClickDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="More options">
          <IconButton edge="end" aria-label="more" onClick={ event => props.onShowOptions(event, props.id) }>
            <MoreVert />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ExpressionItem;
