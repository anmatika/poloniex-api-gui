
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PoloniexActions from '../actions/poloniex';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ShowBalances from '../components/ShowBalances';
import Ticker from '../components/Ticker';
import OpenOrders from '../components/OpenOrders';
import Buy from '../components/Buy';
import Sell from '../components/Sell';
import Message from '../components/Message';


class PoloniexPage extends React.Component {

      componentDidMount() {
            this.props.setInitialValues();
      }

    onSubmit(values) {
      this.props.buyAsync({
        currencyPair: values.target.currencyPair.value,
        amount: values.target.amount.value,
        rate: values.target.rate.value
      });
    }
      render() {
            return (
            <div>
                  <Buy handleSubmit={this.onSubmit.bind(this)} />

                  <Message  />
                  <Tabs>
                        <TabList>
                              <Tab>Balances</Tab>
                              <Tab>Ticker</Tab>
                              <Tab>Open orders</Tab>
                              <Tab>Buy</Tab>
                              <Tab>Sell</Tab>
                        </TabList>
                        <TabPanel>
                              <ShowBalances />
                        </TabPanel>
                        <TabPanel>
                              <Ticker {...this.props} />
                        </TabPanel>
                        <TabPanel>
                              <OpenOrders {...this.props} />
                        </TabPanel>
                        <TabPanel>
                              <Buy />
                        </TabPanel>
                        <TabPanel>
                              <Sell {...this.props} />
                        </TabPanel>
                  </Tabs>
            </div>);
      }

}

function mapStateToProps(state) {
    return {
      state: state.poloniex
    };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators(PoloniexActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PoloniexPage);