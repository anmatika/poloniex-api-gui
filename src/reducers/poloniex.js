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
        tickersRealTime: [],
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
      return showTickerRealTime(state, action);

    default:
      console.log('state default', state);

      return state;
  }
}

function showTickerRealTime(state, action) {
  let arrTickerRealTime = [];
  const data = {
    key: action.data.currencyPair,
    value: action.data,
  };

  if (state.tickersRealTime) {
    arrTickerRealTime = state.tickersRealTime.slice();
  }

  if (arrTickerRealTime.some(x => x.key === data.key)) {
    console.log(data.key, 'same key');
    
    const key = arrTickerRealTime.find(x => x.key === data.key);
    data.value.priceChangedUp = key.value.lastPrice < data.value.lastPrice;
    data.value.priceChangedDown = key.value.lastPrice > data.value.lastPrice;
    data.value.priceSame = key.value.lastPrice === data.value.lastPrice;
    key.value = data.value;
  } else {
    console.log(data.key, 'added');
    arrTickerRealTime.push(data);
  }

  return Object.assign({}, state, { tickersRealTime: arrTickerRealTime });
}
