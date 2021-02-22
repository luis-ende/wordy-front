import React from 'react';
import LearningUnitHeader from './LearningUnitHeader';
import LearningUnitView from '../LearningUnitView/LearningUnitView';
import axios from '../../axios-wordyapp';

const EXPRESSIONS = [
  {id: 1, text: 'laufen', trans: 'caminar', unit: 'verbs', learned: false},
  {id: 2, text: 'rennen', trans: 'correr', unit: 'verbs', learned: false},
  {id: 3, text: 'lieben', trans: 'amar', unit: 'verbs', learned: false},
  {id: 4, text: 'lesen', trans: 'leer', unit: 'verbs', learned: false},
  {id: 5, text: 'krank', trans: 'enfermo', unit: 'adjectives', learned: false},
  {id: 6, text: 'gesund', trans: 'sano', unit: 'adjectives', learned: false},
  {id: 7, text: 'die Stadt', trans: 'la ciudad', unit: 'nouns', learned: false},
  {id: 8, text: 'der Auftrag', trans: 'el encargo', unit: 'nouns', learned: false},
  {id: 9, text: 'schnell', trans: 'rápido', unit: 'adverbs', learned: false},
  {id: 10, text: 'langsam', trans: 'lento', unit: 'adverbs', learned: false},
  {id: 11, text: 'gegenüber', trans: 'en frente', unit: 'prepositions', learned: false},
  {id: 12, text: 'während', trans: 'durante', unit: 'prepositions', learned: false},
]

class LearningUnitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      expressions: EXPRESSIONS,
      currentLearningUnit: '',
      error: false
    }
    this.handleLearuningUnitChange = this.handleLearuningUnitChange.bind(this);
    this.handleExpressionLearned = this.handleExpressionLearned.bind(this);
  }

  componentDidMount () {
    axios.get( 'https://thawing-ocean-88577.herokuapp.com/api/learning_units.json' )
        .then( response => {
            this.setState( { units: response.data } );
        } )
        .catch( error => {
            this.setState( { error: true } );
        } );
  }

  handleLearuningUnitChange(learningUnit) {
    this.setState({
      currentLearningUnit: learningUnit,
    });
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

  getUnitExpressions() {
    let expressions =
      this.state.expressions.filter(exp =>
        exp.unit === this.state.currentLearningUnit &&
        !exp.learned);

    return expressions;
  }

  render() {
    return (
      <div>
        <LearningUnitHeader
          units={this.state.units}
          onLearningUnitChange={this.handleLearuningUnitChange} />
        <LearningUnitView
          unit={this.state.currentLearningUnit}
          expressions={this.getUnitExpressions()}
          currentExpression={0}
          onExpressionLearned={this.handleExpressionLearned} />
      </div>
    );
  }
}

export default LearningUnitBox;
