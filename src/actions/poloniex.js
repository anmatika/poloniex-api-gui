import { tradingApi } from 'poloniex-api';
import objectHelper from '../utils/objectHelper';
import Client from '../Client';
export const GET_BALANCES = 'GET_BALANCES';
export const SHOW_TICKER = 'SHOW_TICKER';
export const SHOW_OPEN_ORDERS = 'SHOW_OPEN_ORDERS';
export const SET_INITIAL_VALUES = 'SET_INITIAL_VALUES';
export const BUY = 'BUY';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';

export function setInitialValues() {
  return {
    type: SET_INITIAL_VALUES,
  };
}

export function getBalances(data) {
  return {
    type: GET_BALANCES,
    data,
  };
}

export function showTicker(data) {
  return {
    type: SHOW_TICKER,
    data,
  };
}

export function showOpenOrders(data) {
  return {
    type: SHOW_OPEN_ORDERS,
    data,
  };
}

export function showMessage(data) {
  return {
    type: SHOW_MESSAGE,
    data,
  };
}

export function getBalancesAsync() {
  return (dispatch, getState) => {
    Client.get('getBalances').then((res) => {
      console.log(res.body);
      return dispatch(getBalances(
          objectHelper.getNonEmptyArrayValuesFromObject(JSON.parse(res.body))));
    });
  };
}

export function showOpenOrdersAsync() {
  return (dispatch, getState) => {
    Client.post('returnOpenOrders', { currencyPair: 'all' })
    .then((res) => {
      console.log(res.body);
      return dispatch(showOpenOrders(res.body));
    }).catch(err => console.log('err', err));
  };
}

export function buyAsync({ currencyPair, amount, rate }) {
  return (dispatch, getState) => {
    Client.post('buy', { currencyPair, amount, rate })
  .then((res) => {
    console.log(res.body);
    return dispatch(showMessage(res.body));
  });
  };
}

export function sellAsync({ currencyPair, amount, rate }) {
  return (dispatch, getState) => {
    Client.post('sell', { currencyPair, amount, rate })
    .then((res) => {
      console.log(res.body);
      return dispatch(showMessage(res.body));
    });
  };
}

export function cancelOrderAsync(orderNumber) {
  return (dispatch, getState) => {
    Client.post('cancelOrder', { orderNumber })
    .then((res) => {
      console.log(res.body);
      return dispatch(showMessage(res.body));
    });
  };
}

export function showTickerAsync() {
  return (dispatch: () => void, getState) => {
    // streamApi.create({ subscriptionName: 'ticker' }, (msg) => {
    // //   console.log(msg);
    // });
  };
}
