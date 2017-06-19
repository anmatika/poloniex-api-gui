const express = require('express');
const apikeys = require('./apikeys');
const PoloniexApi = require('poloniex-api');
const debug = require('debug')('http');
const http = require('http');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const tradingApi = PoloniexApi.tradingApi.create(apikeys.poloniex_api_key, apikeys.poloniex_secret, true);
const publicApi = PoloniexApi.publicApi.create('', '', true);
const pushApi = PoloniexApi.pushApi;

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

  tradingApi.buy({ currencyPair, amount, rate })
  .then((msg) => {
    res.send(msg);
  }).catch(err => res.error(err));
});

app.post('/api/sell', (req, res) => {
  const currencyPair = req.body.currencyPair;
  const amount = req.body.amount;
  const rate = req.body.rate;

  tradingApi.sell({ currencyPair, amount, rate })
  .then((msg) => {
    res.send(msg);
  }).catch(err => res.error(err));
});

app.post('/api/returnOpenOrders', (req, res) => {
  const currencyPair = req.body.currencyPair;

  tradingApi.returnOpenOrders({ currencyPair })
  .then((msg) => {
    res.send(msg);
  }).catch(err => res.error(err));
});

app.post('/api/cancelOrder', (req, res) => {
  const orderNumber = req.body.orderNumber;

  tradingApi.cancelOrder({ orderNumber })
  .then((msg) => {
    res.send(msg);
  }).catch(err => res.error(err));
});

app.get('/api/getBalances', (req, res) => {
  console.log('req.param.q', req.param.q);
  res.setHeader('Content-Type', 'application/json');
  tradingApi.returnBalances()
      .then((r) => {
        res.send(r);
      }).catch(err => res.send(err));
});

app.get('/api/returnTicker', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  publicApi.returnTicker()
      .then((r) => {
        res.send(r);
      }).catch(err => res.send(err));
});

io.of('tickerRealTime')
.on('connection', (socket) => {
  let setIntervalId;
  let buffer = [];
  // when the client emits 'new message', this listens and executes
  socket.on('returnTickerRealTime', (currencyPair) => {
    pushApi.create({
      subscriptionName: 'ticker',
      currencyPair: currencyPair || 'all',
      debug: true }, (obj) => {
      console.log(obj);
      buffer.push(obj);
    });
  });

  setIntervalId = setInterval(() => {
    socket.volatile.emit('ticker', buffer);
    buffer = [];
  }, 2000);

  socket.on('connect', () => {
    console.log(`${socket.name} has connected. ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.name} has disconnected. ${socket.id}`);
    clearInterval(setIntervalId);
  });
});


server.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
