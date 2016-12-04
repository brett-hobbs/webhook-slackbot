'use strict'

const _ = require('lodash');
const config = require('./config');
const request = require('request-promise');
const slack = require('slack');

const webhookSlackBot = slack.rtm.client();

webhookSlackBot.started(payload => {
  this.self = payload.self;
});

function matchesFilter(msg, filterField, filterText) {
  return (!filterField || _.get(msg, filterField, '').indexOf(filterText) > -1);
}

function sendWebhooks(webhookPayload, webhookUrls) {
  // TODO Support signing of the payload.
  _.forEach(webhookUrls, webhookUrl => {
    console.log(`Sending Webhook to ${webhookUrl}`);
    const options = {
      uri: webhookUrl,
      body: webhookPayload,
      json: true,
    };

    request.post(options)
      .then(parsedBody => {
        console.log('POST succeeded...');
      })
      .catch(err => {
        console.error(`POST failed - ${err}`);
      });
  });
}

webhookSlackBot.message(msg => {
  console.log('New message: ', JSON.stringify(msg));

  const filterField = config('MESSAGE_FILTER_FIELD');
  const filterText = config('MESSAGE_FILTER_TEXT');
  if (!matchesFilter(msg, filterField, filterText)) {
    console.log(`Message filtered - message.${filterField} does not contain '${filterText}'`);
    return;
  }

  const webhookUrls = config('WEBHOOK_URLS');
  sendWebhooks(msg, webhookUrls);
});

webhookSlackBot.matchesFilter = matchesFilter;
webhookSlackBot.sendWebhooks = sendWebhooks;

module.exports = webhookSlackBot;
