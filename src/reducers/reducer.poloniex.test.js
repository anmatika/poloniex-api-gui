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
          { ETH: 500 },
          { DASH: 600 },
      ],
    });

    const expected = { balances: [
        { ETH: 50 },
        { DASH: 60 },
    ] };

    expect(state).toEqual(expected);
  });
});
