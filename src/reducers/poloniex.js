// @flow
import { SET_TICKER_REAL_TIME_SEARCH_TERM, SHOW_TICKER_REAL_TIME_SUBSCRIBED, SHOW_TICKER, SHOW_TICKER_REAL_TIME, GET_BALANCES, TOGGLE_SPINNER, SHOW_OPEN_ORDERS, SET_INITIAL_VALUES, SHOW_MESSAGE } from '../actions/poloniex';
import objecthelper from '../utils/objectHelper';

export default function poloniex(state = {}, action) {
  switch (action.type) {

    case SET_INITIAL_VALUES:
      return {
        openOrders: [{
          value: [{}],
        }],
        tickersRealTime: [],
        tickersRealTimeSearchTerm: '',
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
      const arr = objecthelper.objectToArray(action.data);
      return Object.assign({}, state, { tickers: arr });

    case SHOW_TICKER_REAL_TIME_SUBSCRIBED:
      return Object.assign({}, state, { showTickerRealTimeSubscribed: action.data });

    case SHOW_TICKER_REAL_TIME:
      return showTickerRealTime(state, action);

    case SET_TICKER_REAL_TIME_SEARCH_TERM:
      return Object.assign({}, state, { tickersRealTimeSearchTerm: action.data });

    default:
      console.log('state default', state);

      return state;
  }
}

function showTickerRealTime(state, action) {
  let arrTickerRealTime = [];

  if (state.tickersRealTime) {
    arrTickerRealTime = state.tickersRealTime.slice();
  }

  action.data.forEach((obj) => {
    const currencyObjNew = {
      key: obj.currencyPair,
      value: obj,
    };

    if (arrTickerRealTime.some(x => x.key === currencyObjNew.key)) {
      const currencyObjExisting = arrTickerRealTime.find(x => x.key === currencyObjNew.key);
      currencyObjNew.value.priceChangedUp = currencyObjExisting.value.lastPrice < currencyObjNew.value.lastPrice;
      currencyObjNew.value.priceChangedDown = currencyObjExisting.value.lastPrice > currencyObjNew.value.lastPrice;
      currencyObjNew.value.priceSame = currencyObjExisting.value.lastPrice === currencyObjNew.value.lastPrice;
      currencyObjExisting.value = currencyObjNew.value;
    } else {
      arrTickerRealTime.push(currencyObjNew);
    }
  });

  const arrTickerRealTimeSorted = arrTickerRealTime.sort((a, b) => {
    const nameA = a.key.toUpperCase();
    const nameB = b.key.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return Object.assign({}, state, { tickersRealTime: arrTickerRealTimeSorted });
}
