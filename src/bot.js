'use strict'

const _ = require('lodash');
const config = require('./config');
const rp = require('request-promise');
const slack = require('slack');

const webhookSlackBot = slack.rtm.client();

webhookSlackBot.started(payload => {
  this.self = payload.self;
});

webhookSlackBot.message(msg => {
  console.log('New message: ', JSON.stringify(msg));

  const filterField = config('MESSAGE_FILTER_FIELD');
  const filterText = config('MESSAGE_FILTER_TEXT');
  console.log('Testing filters: ', filterField, filterText);
  if (filterField && filterText && _.get(msg, filterField, '').indexOf(filterText) === -1) {
    console.log('Message filtered');
    return;
  }

  const webhookUrls = config('WEBHOOK_URLS');
  _.forEach(webhookUrls, webhookUrl => {
    const webhookPayload = msg;

    // Support signing of the payload.
    const options = {
      method: 'POST',
      uri: webhookUrl,
      body: webhookPayload,
      json: true,
    };

    console.log(`Sending Webhook to ${webhookUrl}`);
    rp(options)
      .then(parsedBody => {
        console.log('POST succeeded...');
      })
      .catch(err => {
        console.log(`POST failed...${err}`);
      });
  });
});

module.exports = webhookSlackBot;
