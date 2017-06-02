// import { routerReducer as router } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';
// import poloniex from './poloniex';

// const rootReducer = combineReducers({
//   poloniex,
//   router,
//   form: formReducer
// });

// export default rootReducer;

import { GET_BALANCES, SHOW_OPEN_ORDERS, SET_INITIAL_VALUES, SHOW_MESSAGE } from '../actions/poloniex';
import objecthelper from '../utils/objectHelper';

export default function crypter(state = {}, action) {
  switch (action.type) {

    case SET_INITIAL_VALUES:
      return {
        openOrders: [{
          value: [{}]
        }]
      };

    case GET_BALANCES:
      console.log('state', state);
      console.log('action.data', action.data);
      return Object.assign({}, state, { balances: action.data });

    case SHOW_OPEN_ORDERS:
      console.log('state', state);
      console.log('action.data', action.data);

      const pruned = objecthelper.getNonEmptyArrayValuesFromObject(JSON.parse(action.data));

      console.log('pruned', pruned);
      return Object.assign({}, state, { openOrders: pruned });

    case SHOW_MESSAGE:
      return Object.assign({}, state, { message: action.data });

    default:
      console.log('state default', state);

      return state;
  }
}