'use strict';

const bodyParser = require('body-parser');
const config = require('./config');
const express = require('express');
const proxy = require('express-http-proxy');

let bot = require('./bot');

let app = express();

if (config('PROXY_URI')) {
  app.use(proxy(config('PROXY_URI'), {
    forwardPath: req => { 
      return require('url').parse(req.url).path;
    }
  }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('\nHello\n');
});

app.listen(config('PORT'), (err) => {
  if (err) throw err;

  console.log(`\nWebhook slackbot running on PORT ${config('PORT')}`);

  if (config('SLACK_TOKEN')) {
    bot.listen({ token: config('SLACK_TOKEN') });
  }
});
