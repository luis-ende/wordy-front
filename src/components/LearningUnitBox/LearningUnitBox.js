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
    this.handleLearningUnitChange = this.handleLearningUnitChange.bind(this);
    this.handleIsLearningToggle = this.handleIsLearningToggle.bind(this);
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

  handleLearningUnitChange(learningUnit) {
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

  handleIsLearningToggle(expressionId) {
    let index = this.state.expressions.findIndex(e => e.id === expressionId);
    if (index >= 0) {
      let updatedExpressions = [...this.state.expressions];
      updatedExpressions[index] = {
        ...this.state.expressions[index],
        isLearning: !this.state.expressions[index].isLearning
      }
      this.setState({
        expressions: updatedExpressions
      });
      //dispatch('TOGGLE_IS_LEARNING', props.id);
    }
  }

  render() {
    return (
      <div>
        <LearningUnitHeader
          units={this.state.units}
          onLearningUnitChange={this.handleLearningUnitChange} />
        <LearningUnitView
          unit={this.state.currentLearningUnit}
          expressions={this.state.expressions}          
          onIsLearningToggle={this.handleIsLearningToggle}
        />
      </div>
    );
  }
}

export default LearningUnitBox;
