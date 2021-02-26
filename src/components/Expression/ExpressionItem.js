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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';

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
        <Tooltip title="Mark as learned">
          <IconButton edge="end" aria-label="learned">
            <CheckCircleIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton edge="end" aria-label="delete" onClick={handleClickDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="More options">
          <IconButton edge="end" aria-label="more" onClick={props.onShowOptions}>
            <MoreVert />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ExpressionItem;
