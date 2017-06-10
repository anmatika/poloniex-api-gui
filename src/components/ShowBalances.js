import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Grid from './Grid';
import * as actions from '../actions/poloniex';

const ShowBalances = (props) => {
  function onClick() {
    props.dispatch(actions.getBalancesAsync());
  }

  function getRows() {
    if (!props.state.balances) return [];

    return props.state.balances
        .filter(b => b.value > 0)
        .map(b => ({ currency: b.key, balance: b.value }));
  }

  const columns = [
        { key: 'currency', name: 'Currency' },
        { key: 'balance', name: 'Balance' },
  ];

  return (
    <div>
      <h2>Balances</h2>
      <Grid rows={getRows()} columns={columns} />
      <Button bsStyle="primary" onClick={onClick} >Show balances</Button>
    </div>);
};

export default connect(state => ({ state: state.app }))(ShowBalances);
