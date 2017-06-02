import React from 'react';
import { connect } from 'react-redux';

const Message = (props) => {

    if (!props.state.message || props.state.message === '') return null;

    return (
    <div>
        <h2>Message</h2>
        <span>{ props.state.message } </span>
    </div>);
 };

export default connect((state) => ({ state: state.app }))(Message);