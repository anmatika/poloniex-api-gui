import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Grid from './Grid';
import * as actions from '../actions/poloniex';

const Ticker = ({ state, returnTickerAsync, dispatch }) => {
  function onClick(e) {
    dispatch(actions.returnTickerAsync());
  }

  function getRows() {
    if (!state.tickers) return [];
    return state.tickers.map(x => ({
      currencyPair: x.key,
      last: x.value.last,
      lowestAsk: x.value.lowestAsk,
      high24hr: x.value.high24hr,
      low24hr: x.value.low24hr,
      highestBid: x.value.highestBid,
      percentChange: x.value.percentChange,
      baseVolume: x.value.baseVolume,
      quoteVolume: x.value.quoteVolume,
      isFrozen: x.value.isFrozen,
    }));
  }

  const columns = [
        { key: 'currencyPair', name: 'Currency pair' },
        { key: 'last', name: 'Last' },
        { key: 'percentChange', name: 'Percent' },
        { key: 'baseVolume', name: 'Volume base' },
        { key: 'quoteVolume', name: 'Volume quote' },
        { key: 'high24hr', name: 'High 24h' },
        { key: 'low24hr', name: 'Low 24h' },
        { key: 'highestBid', name: 'Highest bid' },
        { key: 'isFrozen', name: 'Frozen' },
  ];
  return (
    <div>
      <h2>Ticker</h2>
      <Grid rows={getRows()} columns={columns} />

      <Button bsStyle="primary" onClick={onClick} >Show ticker</Button>
    </div>);
};

export default connect(state => ({ state: state.app }))(Ticker);
