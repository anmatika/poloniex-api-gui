// @flow
import { GET_BALANCES, TOGGLE_SPINNER, SHOW_OPEN_ORDERS, SET_INITIAL_VALUES, SHOW_MESSAGE } from '../actions/poloniex';
import objecthelper from '../utils/objectHelper';

export default function crypter(state = {}, action) {
  switch (action.type) {

    case SET_INITIAL_VALUES:
      return {
        openOrders: [{
          value: [{}],
        }],
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

    case TOGGLE_SPINNER:
      return Object.assign({}, state, { spinner: action.data });

    default:
      console.log('state default', state);

      return state;
  }
}
