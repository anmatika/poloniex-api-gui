import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from './logo.svg';
import PoloniexPage from './containers/PoloniexPage';
import * as PoloniexActions from './actions/poloniex';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.setInitialValues();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <PoloniexPage />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.poloniex,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PoloniexActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
