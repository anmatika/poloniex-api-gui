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
        { key: 'currencyPair', name: 'Currency pair', sortable: true, filterable: true },
        { key: 'last', name: 'Last', sortable: true, filterable: true },
        { key: 'percentChange', name: 'Percent', sortable: true, filterable: true },
        { key: 'baseVolume', name: 'Volume base', sortable: true, filterable: true },
        { key: 'quoteVolume', name: 'Volume quote', sortable: true, filterable: true },
        { key: 'high24hr', name: 'High 24h', sortable: true, filterable: true },
        { key: 'low24hr', name: 'Low 24h', sortable: true, filterable: true },
        { key: 'highestBid', name: 'Highest bid', sortable: true, filterable: true },
        { key: 'isFrozen', name: 'Frozen', sortable: true, filterable: true },
  ];
  return (
    <div>
      <h2>Ticker</h2>
      <Grid rows={getRows()} columns={columns} />

      <Button bsStyle="primary" onClick={onClick} >Show ticker</Button>
    </div>);
};

export default connect(state => ({ state: state.app }))(Ticker);
