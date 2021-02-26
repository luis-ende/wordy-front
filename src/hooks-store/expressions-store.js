import { initStore } from './store';

const configureStore = async () => {
  const actions = {
    SET_EXPRESSIONS: (curState, expressions) => {
      return { expressions: [...expressions] }
    },
    ADD_EXPRESSION: (curState, expression) => {
      const updatedExpressions = [expression, ...curState.expressions];
      return { expressions: updatedExpressions }
    },
    DELETE_EXPRESSION: (curState, expressionId) => {
      const updatedExpressions = [...curState.expressions];
      const index = updatedExpressions.findIndex(e => e.id === expressionId);
      updatedExpressions.splice(index, index >= 0 ? 1 : 0);

      return { expressions: updatedExpressions }
    }
  };

  initStore(actions, []);
}

export default configureStore;
