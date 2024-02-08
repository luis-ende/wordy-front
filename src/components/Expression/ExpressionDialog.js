import React, { useState } from 'react';

import { useStore } from '../../hooks-store/store';
import axios from '../../axios-wordyapp';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

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
          id="grammarType"
          labelId="grammatical-type"
          onChange={handleChange}
          fullWidth
        >
          <MenuItem aria-label="None" value="">None</MenuItem>
          <MenuItem value={1}>Noun</MenuItem>
          <MenuItem value={2}>Verb</MenuItem>
          <MenuItem value={3}>Preposition</MenuItem>
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
