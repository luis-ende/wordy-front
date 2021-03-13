import React, { useEffect } from 'react';

import { useStore } from '../../hooks-store/store';
import axios from '../../axios-wordyapp';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, unitNames, theme) {
  return {
    fontWeight:
      unitNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const LearningUnitSelectDialog = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const state = useStore()[0];
  const [unitNames, setUnitNames] = React.useState([]);

  useEffect(() => {
    axios.get( `expressions/${props.expression}/learning_units`, )
      .then( response => {
        let expressionLU = response.data["hydra:member"];
        let luNames = expressionLU.map( unit => unit.name );        
        setUnitNames(luNames);
      })
      .catch( error => {
      });
  }, [props.expression]);

  const handleSelectChange = (event) => {
    setUnitNames(event.target.value);
  };

  const handleSubmit = () => {
    let luIds = unitNames.map( name => {
      let unit = state.units.find( unit => unit.name === name );
      return unit.id;
    });
    axios.patch( `expressions/${props.expression}/units`, `{\"learningUnits\":[${luIds}]}` )
      .then( response => {
        //dispatch('ADD_EXPRESSION', response.data);
        props.onClose();
      })
      .catch( error => {
      });
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Learning Units</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add expression to learning units:
        </DialogContentText>
        <FormControl  className={classes.formControl}>
          <Select
            id="demo-mutiple-chip"
            fullWidth
            value={unitNames}
            multiple
            onChange={handleSelectChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {state.units.map((unit) => (
              <MenuItem
                key={unit.id}
                value={unit.name}
                style={getStyles(unit.name, unitNames, theme)}>
                {unit.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
