import React, { useState } from 'react';

import { useStore } from '../../hooks-store/store';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import axios from '../../axios-wordyapp';

const ExpressionDialog = (props) => {
  const dispatch = useStore()[1];
  const [expression, setExpression] = useState({
    textLanguage1: '',
    textLanguage2: '',
    language1: 1,
    language2: 2,
    grammarType: 1
  });

  const handleSubmit = () => {
    axios.post( '/expressions.json', expression )
      .then( response => {
        dispatch('ADD_EXPRESSION', response.data);
        props.onClose();
      })
      .catch( error => {
      });
  }

  const handleChange = (e) => {
    setExpression(Object.assign({}, expression, {[e.target.id]: e.target.value}));
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Wordy Expressions</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a new expression to your list.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="textLanguage1"
          label="Expression"
          type="text"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="textLanguage2"
          label="Translation"
          type="text"
          fullWidth
          onChange={handleChange}
        />
        <InputLabel htmlFor="grammatical-type">Grammatical Type</InputLabel>
        <Select
          labelId="grammatical-type"
          onChange={handleChange}
          fullWidth
        >
          <MenuItem aria-label="None" value={0}>None</MenuItem>
          <MenuItem key={1} value={1}>Verb</MenuItem>
          <MenuItem key={2} value={2}>Noun</MenuItem>
          <MenuItem key={3} value={3}>Preposition</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpressionDialog;
