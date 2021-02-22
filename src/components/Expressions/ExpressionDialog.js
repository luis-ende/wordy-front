import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ExpressionDialog = (props) => {
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
          id="expression"
          label="Expression"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="translation"
          label="Translation"
          type="text"
          fullWidth
        />
        <InputLabel id="demo-simple-select-label">Grammatical Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
        >
          <MenuItem value={10}>Verb</MenuItem>
          <MenuItem value={20}>Noun</MenuItem>
          <MenuItem value={30}>Preposition</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onAddExpression} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpressionDialog;
