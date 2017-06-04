
import React from 'react';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/poloniex';

const Sell = (props) => {
  const onSubmit = (values) => {
    values.preventDefault();
    props.dispatch(actions.sellAsync({
      currencyPair: values.target.currencyPair.value,
      amount: values.target.amount.value,
      rate: values.target.rate.value,
    }));
  };

  return (<form onSubmit={onSubmit}>
    <h2>Sell</h2>
    <Field component="input" name="currencyPair" type="text" placeholder="currency pair" />
    <Field component="input" name="amount" type="text" placeholder="amount" />
    <Field component="input" name="rate" type="text" placeholder="rate" />
    <Button type="submit" bsStyle="primary" >Sell</Button>

  </form>);
};

export default reduxForm({
  form: 'sellForm', // a unique name for this form
})(Sell);
