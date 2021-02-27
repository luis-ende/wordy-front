import { initStore } from './store';

import axios from '../axios-wordyapp';

const configureStore = async () => {
  const loadUnits = async () => {
    const response = await axios.get( 'learning_units.json' );

    return response.data;
  }

  const actions = {
    ADD_LU: (curState, unit) => {
      return { units: [...curState.units] }
    }
  };

  const units = await loadUnits();  
  initStore(actions, { units: [...units] });
}

export default configureStore;
