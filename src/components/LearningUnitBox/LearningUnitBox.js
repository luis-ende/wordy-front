import React, { useState } from 'react';

import { useStore } from '../../hooks-store/store';
import axios from '../../axios-wordyapp';

import LearningUnitHeader from './LearningUnitHeader';
import LearningUnitView from '../LearningUnitView/LearningUnitView';

const LearningUnitBox = (props) => {
  //const [units, setUnits] = useState([]);
  const [expressions, setExpressions] = useState([]);
  const [currentLearningUnit, setCurrentLearnigUnit] = useState('');
  const [setError] = useState(false);
  const [state] = useStore();

  const handleLearningUnitChange = (learningUnit) => {
    // eslint-disable-next-line
    if (learningUnit == -1) {
      setCurrentLearnigUnit('');
      setExpressions([]);
    }
    else {
      axios.get( `learning_units/${learningUnit}/expressions` )
        .then( response => {
          // eslint-disable-next-line
          let unit = state.units.find( unit => unit.id == learningUnit );
          let jsonExpressions = response.data['hydra:member'];
          setExpressions(jsonExpressions);
          setCurrentLearnigUnit(unit.name);
        })
        .catch( error => {
          setError( { error: true } );
        });
    }
  }

  let header = state.units &&
    <LearningUnitHeader
      units={state.units}
      onLearningUnitChange={handleLearningUnitChange} />;

  return (
    <div>
      {header}
      <LearningUnitView
        unit={currentLearningUnit}
        expressions={expressions}
      />
    </div>
  );
}

export default LearningUnitBox;
