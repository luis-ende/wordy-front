import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 420,
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LearuningUnitSelect = (props) => {
  const classes = useStyles();

  const handleUnitSelectChange = (e) => {
    props.onLearningUnitChange(e.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-lu-native-simple">Learning Unit</InputLabel>
      <Select
        onChange={handleUnitSelectChange}
        label="Learning Unit"
      >
        <MenuItem aria-label="None" key="default" value="-1">Select learning unit</MenuItem>
        {props.units.map( unit => (
          <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LearuningUnitSelect;
