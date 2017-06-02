
import React from 'react';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions/poloniex';

const Buy = (props) => {

    return (<form onSubmit={props.handleSubmit} >
            <h2>Buy</h2>
            <Field component="input" name="currencyPair" type="text" placeholder="currency pair" />
            <Field component="input" name="amount" type="text" placeholder="amount" />
            <Field component="input" name="rate" type="text" placeholder="rate" />
            <Button type="submit" bsStyle="primary" >Buy</Button>

        </form>);
 };

const buyReduxForm = reduxForm({
  form: 'buyForm' // a unique name for this form
})(Buy);

export default connect((state) => ({ state: state.poloniex }))(buyReduxForm);
