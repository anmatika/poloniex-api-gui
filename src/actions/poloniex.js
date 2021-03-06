import objectHelper from '../utils/objectHelper';
import Client from '../Client';

export const GET_BALANCES = 'GET_BALANCES';
export const SHOW_TICKER = 'SHOW_TICKER';
export const SHOW_TICKER_REAL_TIME = 'SHOW_TICKER_REAL_TIME';
export const SHOW_OPEN_ORDERS = 'SHOW_OPEN_ORDERS';
export const SET_INITIAL_VALUES = 'SET_INITIAL_VALUES';
export const BUY = 'BUY';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const TOGGLE_SPINNER = 'TOGGLE_SPINNER';
export const SHOW_TICKER_REAL_TIME_SUBSCRIBED = 'SHOW_TICKER_REAL_TIME_SUBSCRIBED';
export const SET_TICKER_REAL_TIME_SEARCH_TERM = 'SET_TICKER_REAL_TIME_SEARCH_TERM';

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

export function showTickerRealTime(data) {
  return {
    type: SHOW_TICKER_REAL_TIME,
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

export function toggleSpinner(isToggled, text = '') {
  return {
    type: TOGGLE_SPINNER,
    data: {
      isToggled,
      text,
    },
  };
}

export function showTickerRealTimeSubscribe(data) {
  return {
    type: SHOW_TICKER_REAL_TIME_SUBSCRIBED,
    data,
  };
}
export function setTickerRealTimeSearchTerm(data) {
  return {
    type: SET_TICKER_REAL_TIME_SEARCH_TERM,
    data,
  };
}
export function getBalancesAsync() {
  return (dispatch, getState) => {
    dispatch(toggleSpinner(true));
    Client.get('getBalances').then((res) => {
      if (res.statusCode === 403) {
        dispatch(showMessage(res.body));
      }
      return dispatch(getBalances(
      objectHelper.getNonEmptyArrayValuesFromObject(JSON.parse(res.body))));
    })
      .catch(err => console.log('err', err))
      .then(() => dispatch(toggleSpinner(false)));
  };
}

export function showOpenOrdersAsync() {
  return (dispatch, getState) => {
    dispatch(toggleSpinner(true));
    Client.post('returnOpenOrders', { currencyPair: 'all' })
            .then((res) => {
              if (res.statusCode === 403) {
                dispatch(showMessage(res.body));
              }
              return dispatch(showOpenOrders(res.body));
            })
            .catch(err => console.log('err', err))
            .then(() => dispatch(toggleSpinner(false)));
  };
}

export function buyAsync({ currencyPair, amount, rate }) {
  return (dispatch, getState) => {
    dispatch(toggleSpinner(true));
    Client.post('buy', { currencyPair, amount, rate })
            .then((res) => {
              if (res.statusCode === 403) {
                dispatch(showMessage(res.body));
              }
              return dispatch(showMessage(res.body));
            })
            .catch(err => console.log('err', err))
            .then(() => dispatch(toggleSpinner(false)));
  };
}

export function sellAsync({ currencyPair, amount, rate }) {
  return (dispatch, getState) => {
    dispatch(toggleSpinner(true));
    Client.post('sell', { currencyPair, amount, rate })
            .then((res) => {
              if (res.statusCode === 403) {
                dispatch(showMessage(res.body));
              }
              return dispatch(showMessage(res.body));
            })
            .catch(err => console.log('err', err))
            .then(() => dispatch(toggleSpinner(false)));
  };
}

export function cancelOrderAsync(orderNumber) {
  return (dispatch, getState) => {
    dispatch(toggleSpinner(true));
    Client.post('cancelOrder', { orderNumber })
            .then(res => dispatch(showMessage(res.body)))
            .catch(err => console.log('err', err))
            .then(() => dispatch(toggleSpinner(false)));
  };
}

export function returnTickerAsync() {
  return (dispatch, getState) => {
    Client.get('returnTicker').then((res) => {
      if (res.statusCode === 403) {
        dispatch(showMessage(res.body));
      }
      dispatch(showTicker(JSON.parse(res.body)));
    });
  };
}
