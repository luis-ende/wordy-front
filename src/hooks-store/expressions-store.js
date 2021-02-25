import { initStore } from './store';

const configureStore = async () => {
  const actions = {
    SET_EXPRESSIONS: (curState, expressions) => {
      return { expressions: [...expressions] }
    },
    ADD_EXPRESSION: (curState, expression) => {
      console.log('add expression');
      const updatedExpressions = [expression, ...curState.expressions];
      console.log(updatedExpressions);
      return { expressions: updatedExpressions }
    }
  };

  initStore(actions, []);
}

export default configureStore;
