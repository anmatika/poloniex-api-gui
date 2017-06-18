
import React from 'react';
import { connect } from 'react-redux';
import { Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Grid from './Grid';
import * as actions from '../actions/poloniex';
import _ from 'lodash';
import classNames from 'classnames';
import service from './service';

const TickerRealTimeGrid = ({ state, dispatch }) => {
  function onClick(e) {
    dispatch(actions.toggleSpinner(true));
    dispatch(actions.showTickerRealTimeSubscribe(!state.showTickerRealTimeSubscribed));

    if (state.showTickerRealTimeSubscribed) {
      service.socketApi.disconnect().then(c => console.log('disconnected'));
      return;
    }

    service.socketApi.connect().then(c => console.log('connected'));
    service.socketApi.emit('returnTickerRealTime', 'all');
    service.socketApi.on('ticker', (data) => {
      dispatch(actions.showTickerRealTime(data));
      dispatch(actions.toggleSpinner(false));

      console.log(data);
    });
  }

  function getRows() {
    if (!state.tickersRealTime) return [];
    return state.tickersRealTime.map(x => ({
      currencyPair: x.key,
      lastPrice: x.value.lastPrice,
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
        { key: 'lastPrice', name: 'Last price', sortable: true, filterable: true },
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
      <Button bsStyle="primary" onClick={onClick} >{ state.showTickerRealTimeSubscribed ? 'Disconnect stream' : 'Connect stream' }</Button>
    </div>);
};

export default connect(state => ({ state: state.app }))(TickerRealTimeGrid);
