import React from 'react';
import { connect } from 'react-redux';
import { Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import SearchInput, { createFilter } from 'react-search-input';
import _ from 'lodash';
import Grid from './Grid';
import * as actions from '../actions/poloniex';
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

  const searchUpdated = (term) => {
    dispatch(actions.setTickerRealTimeSearchTerm(term || ''));
  };

  const KEYS_TO_FILTERS = ['key'];
  const filteredTickersRealTime = state.tickersRealTime.filter(createFilter(state.showTickerRealTimeSearchTerm, KEYS_TO_FILTERS));

  return (
    <div>
      <h2>Ticker stream</h2>
      <div
        className="row"
      >
        <div className="col-xs-12 margin-b-25">
          <Button bsStyle="primary" onClick={onClick} >{ state.showTickerRealTimeSubscribed ? 'Disconnect stream' : 'Connect stream' }</Button>
        </div>
        <div className="col-xs-12 margin-b-25">
          <SearchInput className="search-input" onChange={searchUpdated} />
        </div>
      </div>
      { state.tickersRealTime.length > 0 && filteredTickersRealTime.map((x) => {
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
