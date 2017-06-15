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
          <h1> Poloniex API GUI </h1>
        </div>
        <p className="App-intro" />
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
