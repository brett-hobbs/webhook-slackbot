# webhook-slackbot
A SlackBot that listens to a Slack channel and sends a JSON webhook for each message

The [existing support](https://api.slack.com/outgoing-webhooks) for **outgoing** webhooks from Slack suffers from a few serious shortcomings.
- The only format offered is a key/value format that somewhat resembles an html form post. Traditional webhook formats like JSON and XML are not supported.
- Likely due to the limitation mentioned above - rich messages with attachments are syndicated with an empty message body. Its possible to get some metadata about the message (channel, user, etc.) but the message itself is missing.

This is a simple application that connects to the Slack RTM API (which appears to be where Slack is focusing its investments) and listens for messages. When a message occurs it broadcasts the metadata about the message and its full contents as a webhook with a JSON payload.

This application intends to provide a simple solution for getting a better outgoing webhook from Slack. Its very easy to configure and run on Heroku. There are only two settings required for configuration `SLACK_TOKEN` and `WEBHOOK_URL`. The 

Future updates will include things like
1. filtering options
2. XML webhook formatting
3. Signing webhook payloads

For now its pretty easy to pipe webhooks through a tool like reflector.io for additional configuration.
