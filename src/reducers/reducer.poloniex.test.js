import reducer from './poloniex';

import { GET_BALANCES, TOGGLE_SPINNER, SHOW_OPEN_ORDERS, SET_INITIAL_VALUES, SHOW_MESSAGE } from '../actions/poloniex';

describe('SET_INITIAL_STATE', () => {
  it('Sets initial state', () => {
    const initialState = ({});

    const state = reducer(initialState, {
      type: SET_INITIAL_VALUES,
    });

    const expected = {
      openOrders: [{
        value: [{}],
      }],
    };

    expect(state).toEqual(expected);
  });
});

describe('GET_BALANCES', () => {
  it('gets balances', () => {
    const initialState = ({});

    const state = reducer(initialState, {
      type: GET_BALANCES,
      data: [
          { ETH: 50 },
          { DASH: 60 },
      ],
    });

    const expected = {
      balances: [
        { ETH: 50 },
        { DASH: 60 },
      ],
    };

    expect(state).toEqual(expected);
  });
});

describe('SHOW_OPEN_ORDERS', () => {
  it('gets open orders', () => {
    const initialState = ({});

    const state = reducer(initialState, {
      type: SHOW_OPEN_ORDERS,
      data: `{ "BTC_ETC": [],
        "BTC_ETH": [{ "orderNumber": "12345678", "type": "buy", "rate": "0.10000000", "amount": "1.50000000" }],
        "BTC_EXP": [],
        "BTC_FCT": [] }`,
    });

    const expected = {
      openOrders: [{
        key: 'BTC_ETH',
        value: [{
          amount: '1.50000000',
          orderNumber: '12345678',
          rate: '0.10000000',
          type: 'buy',
        }],
      }],
    };

    expect(state).toEqual(expected);
  });
});
