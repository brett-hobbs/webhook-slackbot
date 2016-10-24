'use strict'

const _ = require('lodash');
const config = require('../config');
const trending = require('github-trending');
const Botkit = require('botkit');

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({ url: config('WEBHOOK_URL') });

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Webhook Bot',
  icon_emoji: config('ICON_EMOJI')
};

trending('javascript', (err, repos) => {
  if (err) {
    throw err;
  }

  const attachments = repos.slice(0, 5).map((repo) => {
    return {
      title: `${repo.owner}/${repo.title} `,
      title_link: repo.url,
      text: `_${repo.description}_\n${repo.language}`,
      mrkdwn_in: ['text', 'pretext']
    };
  });

  let msg = _.defaults({ attachments: attachments }, msgDefaults);

  bot.sendWebhook(msg, (err, res) => {
    if (err) {
      throw err;
    }

    console.log('\nWebhook delivered');
  });
});