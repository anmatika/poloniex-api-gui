import React from 'react';
import { Button } from 'react-bootstrap';
import Grid from './Grid';

const OpenOrders = ({ state, showOpenOrdersAsync, cancelOrderAsync }) => {
    function onClick() {
        showOpenOrdersAsync();
    }

    const CancelOrderButton = ({ value }) => (<button onClick={() => cancelOrderAsync(value)}>Cancel</button>);

    function getRows() {
        const rows = [];
        if (!state.openOrders) return rows;

        state.openOrders.forEach((currency) => {
            currency.value.forEach((value) => {
                const row = {
                    currency: currency.key,
                    amount: value.amount,
                    rate: value.rate,
                    total: value.total,
                    type: value.type,
                    orderNumber: value.orderNumber,
                    cancelOrder: value.orderNumber
                };
                rows.push(row);
            });
        });
        return rows;
    }

    const columns = [
        { key: 'currency', name: 'Currency' },
        { key: 'amount', name: 'Amount' },
        { key: 'type', name: 'Type' },
        { key: 'total', name: 'Total' },
        { key: 'rate', name: 'Rate' },
        { key: 'orderNumber', name: 'OrderNumber' },
        { key: 'cancelOrder', name: 'CancelOrder', formatter: CancelOrderButton }
        ];

    return (<div>
            <h2>Open orders</h2>
            <Grid rows={getRows()} columns={columns} />
            <Button bsStyle="primary" onClick={onClick} >Show OpenOrders</Button>

        </div>);
 };

export default OpenOrders;
