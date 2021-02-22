import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
        native
        onChange={handleUnitSelectChange}
        label="Learning Unit"
      >
        <option aria-label="None" key="default" value="default">Select learning unit</option>
        {props.units.map( unit => (
          <option key={unit.id} value={unit.id}>{unit.name}</option>
        ))}
      </Select>
    </FormControl>
  );
}

export default LearuningUnitSelect;
