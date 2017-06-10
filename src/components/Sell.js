
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

  return (<form className="form--centered form--padding-top" onSubmit={onSubmit} >
    <div className="form-group">
      <label htmlFor="currencyPair">Currency pair</label>
      <Field component="input" className="form-control" name="currencyPair" type="text" placeholder="currency pair" />
    </div>
    <div className="form-group">
      <label htmlFor="amount">Amount</label>
      <Field component="input" className="form-control" name="amount" type="number" placeholder="amount" />
    </div>
    <div className="form-group">
      <label htmlFor="rate">Rate</label>
      <Field component="input" className="form-control" name="rate" type="number" step="0.01" placeholder="rate" />
    </div>
    <div className="form-group">
      <Button type="submit" bsStyle="primary" >Sell</Button>
    </div>

  </form>);
};

export default reduxForm({
  form: 'sellForm', // a unique name for this form
})(Sell);
