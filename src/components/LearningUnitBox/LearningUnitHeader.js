import React from 'react';
import LearningUnitSelect from './LearningUnitSelect'

class LearningUnitHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleLearuningUnitChange = this.handleLearuningUnitChange.bind(this);
  }

  handleLearuningUnitChange(learningUnit) {
    this.props.onLearningUnitChange(learningUnit);
  }

  render() {
    return (
      <div>
        <LearningUnitSelect
          units={this.props.units}
          onLearningUnitChange={this.handleLearuningUnitChange} />
      </div>
    );
  }
}

export default LearningUnitHeader;
