
import { connect } from 'react-redux';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Spinner from '../components/Spinner';
import ShowBalances from '../components/ShowBalances';
import OpenOrders from '../components/OpenOrders';
import Buy from '../components/Buy';
import Sell from '../components/Sell';
import Message from '../components/Message';

class PoloniexPage extends React.Component {
  render() {
    return (
      <div>
        <Spinner />
        <Message />
        <Tabs>
          <TabList>
            <Tab>Balances</Tab>
            <Tab>Open orders</Tab>
            <Tab>Buy</Tab>
            <Tab>Sell</Tab>
          </TabList>
          <TabPanel>
            <ShowBalances />
          </TabPanel>
          <TabPanel>
            <OpenOrders />
          </TabPanel>
          <TabPanel>
            <Buy />
          </TabPanel>
          <TabPanel>
            <Sell />
          </TabPanel>
        </Tabs>
      </div>);
  }

}

export default connect(state => ({ state: state.app }))(PoloniexPage);
