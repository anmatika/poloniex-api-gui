const express = require('express');
const apikeys = require('./apikeys');
const api = require('poloniex-api').tradingApi.create(apikeys.poloniex_api_key, apikeys.poloniex_secret, true);

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/food', (req, res) => {
  console.log('food hit')
  // const param = req.query.q;
  res.setHeader('Content-Type', 'application/json');
    api.returnBalances()
      .then((r) => {
        res.send(r);
    }).catch(err => res.send(err));
});
 

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});