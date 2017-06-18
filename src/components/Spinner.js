import React from 'react';
import { connect } from 'react-redux';
import ReactSpinner from 'react-spinner';

const Spinner = (props) => {
  if (!props.state.spinner) return null;
  return (<div className="react-spinner-container">
    <ReactSpinner />
    <div className="react-spinner-text"> { props.state.spinnerText } </div>
  </div>);
};

export default connect(state => ({ state: state.app }))(Spinner);
