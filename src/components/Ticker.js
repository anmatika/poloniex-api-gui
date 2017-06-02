import React from 'react';
import { Button } from 'react-bootstrap';

const Ticker = ({ state, showTickerAsync }) => {
    function onClick(e) {
        showTickerAsync();
    }
    return (
    <div>
          <h2>Ticker</h2>
          <textarea value={state.ticker} />
          <Button bsStyle="primary" onClick={onClick} >Show ticker</Button>
    </div>);
 };

export default Ticker;