// @flow
import { SHOW_TICKER, SHOW_TICKER_REAL_TIME, GET_BALANCES, TOGGLE_SPINNER, SHOW_OPEN_ORDERS, SET_INITIAL_VALUES, SHOW_MESSAGE } from '../actions/poloniex';
import objecthelper from '../utils/objectHelper';

export default function poloniex(state = {}, action) {
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

    case SHOW_TICKER:
      // const arr = objecthelper.objectToArray(JSON.parse(action.data));
      const arr = objecthelper.objectToArray(action.data);
      return Object.assign({}, state, { tickers: arr });

    case SHOW_TICKER_REAL_TIME:
      let arrTickerRealTime = [];
      if (state.tickersRealTime) {
        arrTickerRealTime = state.tickersRealTime.slice();
      }
      const d = {
        key: action.data.currencyPair,
        value: action.data,
      };
      if (arrTickerRealTime.some(x => x.key === d.key)) {
        console.log(d.key, 'value changed')
        arrTickerRealTime[d.key] = d;
      } else {
        console.log(d.key, 'added')
        arrTickerRealTime.push(d);
      }

      return Object.assign({}, state, { tickersRealTime: arrTickerRealTime });

    default:
      console.log('state default', state);

      return state;
  }
}
