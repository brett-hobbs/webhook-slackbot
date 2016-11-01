'use strict'

const dotenv = require('dotenv');
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
  dotenv.load();
}

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PROXY_URI: process.env.PROXY_URI,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  SLACK_TOKEN: process.env.SLACK_TOKEN,
  MESSAGE_FILTER_FIELD: process.env.MESSAGE_FILTER_FIELD,
  MESSAGE_FILTER_TEXT: process.env.MESSAGE_FILTER_TEXT,
  ICON_EMOJI: ':stars:'
};

module.exports = key => {
  if (!key) {
    return config;
  }

  return config[key];
};
