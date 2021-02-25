import React from 'react';
import LearningUnitHeader from './LearningUnitHeader';
import LearningUnitView from '../LearningUnitView/LearningUnitView';
import axios from '../../axios-wordyapp';

class LearningUnitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      expressions: [],
      currentLearningUnit: '',
      error: false
    }
    this.handleLearuningUnitChange = this.handleLearuningUnitChange.bind(this);
    this.handleExpressionLearned = this.handleExpressionLearned.bind(this);
  }

  componentDidMount () {
    axios.get( 'learning_units.json' )
      .then( response => {
          this.setState( { units: response.data } );
      })
      .catch( error => {
          this.setState( { error: true } );
      });
  }

  handleLearuningUnitChange(learningUnit) {
    // eslint-disable-next-line
    if (learningUnit == -1) {
      this.setState({
        currentLearningUnit: '',
        expressions: []
      });
    }
    else {
      axios.get( `expressions?learningUnits.id=${learningUnit}` )
        .then( response => {
            // eslint-disable-next-line
            let unit = this.state.units.find( unit => unit.id == learningUnit );
            let jsonExpressions = response.data['hydra:member'];
            this.setState({
              expressions: jsonExpressions,
              currentLearningUnit: unit.name
            });
        })
        .catch( error => {
            this.setState( { error: true } );
        });
    }
  }

  handleExpressionLearned(id) {
    const updatedExpressions = [...this.state.expressions];
    const expr = updatedExpressions.find(expr => expr.id === id );
    if (expr) {
      expr.learned = true;
      this.setState({
        expressions: updatedExpressions,
      });
    }
  }

  render() {
    return (
      <div>
        <LearningUnitHeader
          units={this.state.units}
          onLearningUnitChange={this.handleLearuningUnitChange} />
        <LearningUnitView
          unit={this.state.currentLearningUnit}
          expressions={this.state.expressions}
          currentExpression={0}
          onExpressionLearned={this.handleExpressionLearned} />
      </div>
    );
  }
}

export default LearningUnitBox;
