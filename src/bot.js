'use strict'

const slack = require('slack');
const _ = require('lodash');
const config = require('./config');
const rp = require('request-promise');

const webhookSlackBot = slack.rtm.client();

webhookSlackBot.started((payload) => {
  this.self = payload.self;
});

webhookSlackBot.message((msg) => {
  console.log('New message: ', JSON.stringify(msg));

  // Make this configurable
  if (!msg.attachments || msg.attachments[0].pretext !== 'Tests result') {
    return;
  }

  const webhookUrl = config('WEBHOOK_URL');
  const webhookPayload = msg;
  console.log(`Sending Webhook to ${webhookUrl}`);

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
