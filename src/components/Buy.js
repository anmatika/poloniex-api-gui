
import React from 'react';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions/poloniex';

const Buy = (props) => {
  const onSubmit = (values) => {
    values.preventDefault();
    props.dispatch(actions.buyAsync({
      currencyPair: values.target.currencyPair.value,
      amount: values.target.amount.value,
      rate: values.target.rate.value,
    }));
  };

  return (<form className="form form--centered form--padding-top" onSubmit={onSubmit} >
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
      <Button type="submit" bsStyle="primary" >Buy</Button>
    </div>

  </form>);
};

const buyReduxForm = reduxForm({
  form: 'buyForm', // a unique name for this form
})(Buy);

export default connect(state => ({ state: state.poloniex }))(buyReduxForm);
