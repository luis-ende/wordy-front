import React from 'react';
import LearningUnitSelect from './LearningUnitSelect'

const LearningUnitHeader = (props) => {
  /* constructor(props) {
    super(props);
    this.handleLearuningUnitChange = this.handleLearuningUnitChange.bind(this);
  } */

  const handleLearuningUnitChange = (learningUnit) => {    
    props.onLearningUnitChange(learningUnit);
  };
  
  return (
    <div>
      <LearningUnitSelect
        units={props.units}
        onLearningUnitChange={handleLearuningUnitChange} />
    </div>
  );  
}

export default LearningUnitHeader;
