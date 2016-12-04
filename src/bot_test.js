'use strict'

const chai = require('chai');
const promise = require('bluebird');
const request = require('request-promise');
const sinon = require('sinon');

const assert = chai.assert;

describe('webhookSlackBot', () => {
  let webhookSlackBot;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
    webhookSlackBot = require('./bot');
  });

  describe('matchesFilter', () => {
    it('passes with no filter field', () => {
      assert.isTrue(webhookSlackBot.matchesFilter({channel: 'misc'}, '', ''));
    });

    it('passes with no filter text', () => {
      assert.isTrue(webhookSlackBot.matchesFilter({channel: 'misc'}, 'channel', ''));
    });

    it('passes with filter text exact match', () => {
      assert.isTrue(webhookSlackBot.matchesFilter({channel: 'misc'}, 'channel', 'misc'));
    });

    it('passes with filter text substring match', () => {
      assert.isTrue(webhookSlackBot.matchesFilter({channel: 'string'}, 'channel', 'ring'));
    });

    it('fails when missing field', () => {
      assert.isFalse(webhookSlackBot.matchesFilter({other: 'misc'}, 'channel', 'misc'));
    });

    it('fails when field doesn\'t match', () => {
      assert.isFalse(webhookSlackBot.matchesFilter({channel: 'different'}, 'channel', 'misc'));
    });
  });

  describe('sendWebhooks', () => {
    const webhookUrls = [
      'url1.com',
      'url2.com',
    ];
    const payload = {channel: 'misc'};

    beforeEach(() => {
      sinon.stub(request, 'post').returns(promise.resolve({}));
    });

    afterEach(() => {
      request.post.restore();
    });

    it('sendWebhooks', () => {
      webhookSlackBot.sendWebhooks(payload, webhookUrls);

      assert.equal(request.post.callCount, webhookUrls.length);
      assert.deepEqual(request.post.lastCall.args[0], {
        body: {
          channel: 'misc',
        },
        json: true,
        uri: 'url2.com',
      });
    });
  });
});
