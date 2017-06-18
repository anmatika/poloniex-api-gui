import React from 'react';
import { connect } from 'react-redux';
import { Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Grid from './Grid';
import * as actions from '../actions/poloniex';
import _ from 'lodash';
import classNames from 'classnames';
import service from './service';

const TickerRealTime = ({ state, dispatch }) => {
  function onClick(e) {
    dispatch(actions.toggleSpinner(true));
    dispatch(actions.showTickerRealTimeSubscribe(!state.showTickerRealTimeSubscribed));

    if (state.showTickerRealTimeSubscribed) {
      service.socketApi.disconnect().then(c => console.log('disconnected'));
      dispatch(actions.toggleSpinner(false));
      return;
    }

    service.socketApi.connect().then(c => console.log('connected'));
    service.socketApi.emit('returnTickerRealTime', 'all');
    service.socketApi.on('ticker', (data) => {
      if (data.length > 0) {
        dispatch(actions.showTickerRealTime(data));
        dispatch(actions.toggleSpinner(false));
      }
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
      <h2>Ticker stream</h2>
      <div
        className="row"
      >
        <div className="col-xs-12 margin-b-25">
          <Button bsStyle="primary" onClick={onClick} >{ state.showTickerRealTimeSubscribed ? 'Disconnect stream' : 'Connect stream' }</Button>
        </div>
      </div>
      { state.tickersRealTime.length > 0 && state.tickersRealTime.map((x) => {
        const priceClassNames = classNames({
          'color-green': x.value.priceChangedUp,
          'color-red': x.value.priceChangedDown,
          'color-black': x.value.priceSame,
        });

        return (<div key={`ticker-${x.key}`}>
          <div className="col-xs-3">
            <Panel header={x.key}>
              <ListGroup>
                <ListGroupItem>
              Price: <span className={priceClassNames}>{ x.value.lastPrice }</span>
                </ListGroupItem>
                <ListGroupItem>
              %: { x.value.percentChange }
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </div>
        </div>)
 ;
      })}

    </div>);
};

export default connect(state => ({ state: state.app }))(TickerRealTime);
