# webhook-slackbot
A SlackBot that listens to a Slack channel and sends a JSON webhook for each message

The [existing support](https://api.slack.com/outgoing-webhooks) for **outgoing** webhooks from Slack suffers from a few serious shortcomings.
- The only format offered is a key/value format that somewhat resembles an html form post. Traditional webhook formats like JSON and XML are not supported.
- Likely due to the limitation mentioned above - rich messages with attachments are syndicated with an empty message body. Its possible to get some metadata about the message (channel, user, etc.) but the message itself is missing.

This is a simple application that connects to the Slack RTM API (which appears to be where Slack is focusing its investment) and listens for messages. When a message occurs it broadcasts the metadata about the message and its full contents as a webhook with a JSON payload.

This application intends to provide a simple solution for getting a better outgoing webhook from Slack. Its very easy to configure and run on Heroku. There are only two [configuration variables](https://devcenter.heroku.com/articles/config-vars) required: `SLACK_TOKEN` and `WEBHOOK_URL`.

Filtering messages is also supported with the `MESSAGE_FILTER_FIELD` and `MESSAGE_FILTER_TEXT` options. `MESSAGE_FILTER_FIELD` supports a lodash style [get path](https://lodash.com/docs/4.16.6#get) to a field with in the [Slack message object](https://api.slack.com/events/message) (For example `attachments[0].title` references `message.attachments[0].title`). `MESSAGE_FILTER_TEXT` is used to look for a matching substring in the aforementioned field.

Try it out:

1. Go to your slack settings ["Build a Custom Integration"](https://api.slack.com/custom-integrations) and get a token for API access

2. Click this Heroku badge to deploy an instance: [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

3. Enter the token from step 1 and a webhook url endpoint of your choosing to configure the bot


Future updates will include:
* XML webhook formatting
* Signing webhook payloads

For now, its pretty easy to pipe your webhooks through a tool like [Reflector.io](https://reflector.io/) for additional configuration.
