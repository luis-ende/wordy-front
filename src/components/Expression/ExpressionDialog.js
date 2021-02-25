import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import axios from '../../axios-wordyapp';

const ExpressionDialog = (props) => {
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
        props.onClose();        
      })
      .catch( error => {
      });
  }

  const handleChange = (e) => {
    setExpression(Object.assign({}, expression, {[e.target.id]: e.target.value}));
  }

  return (
    <form onSubmit="handleSubmit">
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
          <InputLabel id="category">Grammatical Category</InputLabel>
          <Select
            labelId="category"
            id="grammarType"
            fullWidth
            onChange={handleChange}
            native
          >
            <option key={1} value={1}>Verb</option>
            <option key={2} value={2}>Noun</option>
            <option key={3} value={3}>Preposition</option>
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
    </form>
  );
}

export default ExpressionDialog;
