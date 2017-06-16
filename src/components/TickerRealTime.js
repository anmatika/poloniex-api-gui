import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Grid from './Grid';
import * as actions from '../actions/poloniex';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

socket.on('connect', (s) => {
  console.log('Connected!');
});

const TickerRealTime = ({ state, dispatch }) => {
  function onClick(e) {
    socket.emit('returnTickerRealTime');
        // dispatch(actions.returnTickerAsync());
  }
  socket.on('ticker', (data) => {
    console.log(data);
    dispatch(actions.showTickerRealTime(data));
  });

  function getRows() {
    if (!state.tickersRealTime) return [];
    const x = state.tickersRealTime;
    return [{
      currencyPair: x.key,
      last: x.last,
      lowestAsk: x.lowestAsk,
      high24hr: x.high24hr,
      low24hr: x.low24hr,
      highestBid: x.highestBid,
      percentChange: x.percentChange,
      baseVolume: x.baseVolume,
      quoteVolume: x.quoteVolume,
      isFrozen: x.isFrozen,
    }];
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

export default connect(state => ({ state: state.app }))(TickerRealTime);
