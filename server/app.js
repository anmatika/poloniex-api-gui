const express = require('express');
const apikeys = require('./apikeys');
const api = require('poloniex-api').tradingApi.create(apikeys.poloniex_api_key, apikeys.poloniex_secret, true);
const debug = require('debug')('http')
const http = require('http')
const app = express();
const chalk = require('chalk')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

function log(...text) {
  console.log(chalk.bgBlue(...text))
}

app.post('/api/buy', (req, res) => {
const currencyPair = req.body.currencyPair;
const amount = req.body.amount;
const rate = req.body.rate;

  api.buy({ currencyPair, amount, rate })
  .then(msg => {
    res.send(msg)
  }).catch(err => res.error(err))
})

app.get('/api/main', (req, res) => {
  // const param = req.query.q;

  const param = req.query.q;

  log('param', param)

  if (!param) {
    log('missing param')
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  switch(param) {
    case 'getBalances': 
      log('returnBalances hit')
       return returnBalances(res);
    case 'buy': 
      log('buy hit')
       return buy(res);
    default:
       res.send('unknown query')
  }

});

function returnBalances(res)  {
    res.setHeader('Content-Type', 'application/json');
     api.returnBalances()
      .then((r) => {
        res.send(r);
    }).catch(err => res.send(err));
}

function buy(res) {

    res.setHeader('Content-Type', 'application/json');
     api.returnBalances()
      .then((r) => {
        res.send(r);
    }).catch(err => res.send(err));
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});