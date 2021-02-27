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
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const LearningUnitSelectDialog = (props) => {
  const handleSubmit = () => {
  }
  
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Learning Units</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add expression to learning units:
        </DialogContentText>
        <Select
          id="learningUnit"
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

export default LearningUnitSelectDialog;
