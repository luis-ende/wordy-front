import React from 'react';

//import { makeStyles } from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 420,
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
 */
const LearuningUnitSelect = (props) => {
  //const classes = useStyles();

  const handleUnitSelectChange = (e) => {    
    props.onLearningUnitChange(e.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-lu-native-simple">Learning Unit</InputLabel>
      <Select
        style={{marginBottom: "10px"}}
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
