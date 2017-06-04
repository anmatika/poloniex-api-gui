const express = require('express');
const apikeys = require('./apikeys');
const api = require('poloniex-api').tradingApi.create(apikeys.poloniex_api_key, apikeys.poloniex_secret, true);
const debug = require('debug')('http');
const http = require('http');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

function log(...text) {
  console.log(chalk.bgBlue(...text));
}

app.post('/api/buy', (req, res) => {
  const currencyPair = req.body.currencyPair;
  const amount = req.body.amount;
  const rate = req.body.rate;

  api.buy({ currencyPair, amount, rate })
  .then((msg) => {
    res.send(msg);
  }).catch(err => res.error(err));
});

app.post('/api/sell', (req, res) => {
  const currencyPair = req.body.currencyPair;
  const amount = req.body.amount;
  const rate = req.body.rate;

  api.sell({ currencyPair, amount, rate })
  .then((msg) => {
    res.send(msg);
  }).catch(err => res.error(err));
});

app.post('/api/returnOpenOrders', (req, res) => {
  const currencyPair = req.body.currencyPair;

  api.returnOpenOrders({ currencyPair })
  .then((msg) => {
    res.send(msg);
  }).catch(err => res.error(err));
});

app.post('/api/cancelOrder', (req, res) => {
  const orderNumber = req.body.orderNumber;

  api.cancelOrder({ orderNumber })
  .then((msg) => {
    res.send(msg);
  }).catch(err => res.error(err));
});

app.get('/api/getBalances', (req, res) => {
  console.log('req.param.q', req.param.q);
  res.setHeader('Content-Type', 'application/json');
  api.returnBalances()
      .then((r) => {
        res.send(r);
      }).catch(err => res.send(err));
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
