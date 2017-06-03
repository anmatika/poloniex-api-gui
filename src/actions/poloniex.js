 import { tradingApi } from 'poloniex-api';
 import poloniexApi from 'poloniex-api';
// import keys from '../../../keys/apikeys';
import objectHelper from '../utils/objectHelper';
import Client from '../Client';
export const GET_BALANCES = 'GET_BALANCES';
export const SHOW_TICKER = 'SHOW_TICKER';
export const SHOW_OPEN_ORDERS = 'SHOW_OPEN_ORDERS';
export const SET_INITIAL_VALUES = 'SET_INITIAL_VALUES';
export const BUY = 'BUY';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
const keys = {};

const api = poloniexApi.tradingApi.create(keys.poloniex_api_key, keys.poloniex_secret);

export function setInitialValues() {
  return {
      type: SET_INITIAL_VALUES
  };
}

export function getBalances(data) {
  return {
      type: GET_BALANCES,
      data
  };
}

export function showTicker(data) {
  return {
      type: SHOW_TICKER,
      data
  };
}

export function showOpenOrders(data) {
  return {
      type: SHOW_OPEN_ORDERS,
      data
  };
}

export function showMessage(data) {
  return {
      type: SHOW_MESSAGE,
      data
  };
}

export function getBalancesAsync() {
  return (dispatch: () => void, getState) => {
    Client.search('getBalances', (res) => {
      console.log(res.body);
        return dispatch(getBalances(
          objectHelper.getNonEmptyArrayValuesFromObject(JSON.parse(res.body))));
      })
    };
}

export function showOpenOrdersAsync() {
  return (dispatch: () => void, getState) => {
    api.returnOpenOrders({ currencyPair: 'all' })
      .then((res) => {
        console.log(res.body);
        return dispatch(showOpenOrders(res.body));
      }).catch(err => console.log('err', err));
  };
}

export function buyAsync({ currencyPair, amount, rate }) {
  return (dispatch: () => void, getState) => {
    return dispatch(showMessage('foobar'));
    // api.buy({ currencyPair, amount, rate }).then(msg => {
    //   const converted = objectHelper.objectToArray(JSON.parse(msg.body));
    //   if (!converted.orderNumber) {
    //     return dispatch(showMessage(msg.body));
    //   }
    //   return dispatch(showMessage(msg.body));
    // }).catch(err => {
    //   dispatch(showMessage(err));
    // });
  };
}

export function sellAsync({ currencyPair, amount, rate }) {
  return (dispatch: () => void, getState) => {
    api.sell({ currencyPair, amount, rate }).then(msg => {
      const converted = objectHelper.objectToArray(JSON.parse(msg.body));
      if (!converted.orderNumber) {
        return dispatch(showMessage(msg.body));
      }
      return dispatch(showMessage(msg.body));
    }).catch(err => {
      dispatch(showMessage(err));
    });
  };
}

export function cancelOrderAsync(orderNumber) {
  return (dispatch: () => void, getState) => {
    api.cancelOrder({ orderNumber })
      .then((res) => {
        console.log(res.body);
        return dispatch(showMessage(res.body));
      }).catch(err => showMessage(err));
  };
}

export function showTickerAsync() {
  return (dispatch: () => void, getState) => {
    // streamApi.create({ subscriptionName: 'ticker' }, (msg) => {
    // //   console.log(msg);
    // });
  };
}
