import { initStore } from './store';

const configureStore = () => {
  const actions = {
    SET_EXPRESSIONS: (curState, expressions) => {
      return { expressions: [...expressions] }
    },
    ADD_EXPRESSION: (curState, expression) => {
      if (curState.expressions) {
        const updatedExpressions = [expression, ...curState.expressions];

        return { expressions: updatedExpressions }
      }
    },
    DELETE_EXPRESSION: (curState, expressionId) => {
      if (curState.expressions) {
        const updatedExpressions = [...curState.expressions];
        const index = updatedExpressions.findIndex(e => e.id === expressionId);
        updatedExpressions.splice(index, index >= 0 ? 1 : 0);

        return { expressions: updatedExpressions }
      }
    },
    TOGGLE_IS_LEARNING: (curState, expressionId) => {
      if (curState.expressions) {
        const index = curState.expressions.findIndex(e => e.id === expressionId);
        if (index >= 0) {
          const updatedExpressions = [...curState.expressions];
          updatedExpressions[index] = {
            ...curState.expressions[index],
            isLearning: !curState.expressions[index].isLearning
          };

          return { expressions: updatedExpressions }
        }
      }
    }
  };

  initStore(actions, []);
}

export default configureStore;
