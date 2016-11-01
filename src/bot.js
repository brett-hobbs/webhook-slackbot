'use strict'

const slack = require('slack');
const _ = require('lodash');
const config = require('./config');
const rp = require('request-promise');

const webhookSlackBot = slack.rtm.client();

webhookSlackBot.started(payload => {
  this.self = payload.self;
});

webhookSlackBot.message(msg => {
  console.log('New message: ', JSON.stringify(msg));

  const filterField = config('MESSAGE_FILTER_FIELD');
  const filterText = config('MESSAGE_FILTER_TEXT');
  if (filterField && filterText && _.get(msg, filterField, '').indexOf(filterText) === -1) {
    console.log('Message filtered');
    return;
  }

  const webhookUrl = config('WEBHOOK_URL');
  const webhookPayload = msg;
  console.log(`Sending Webhook to ${webhookUrl}`);

  // Support signing of the payload.
  const options = {
    method: 'POST',
    uri: webhookUrl,
    body: webhookPayload,
    json: true,
  };

  rp(options)
    .then(parsedBody => {
      console.log('POST succeeded...');
    })
    .catch(err => {
      console.log('POST failed...', err);
    });
});

module.exports = webhookSlackBot;
