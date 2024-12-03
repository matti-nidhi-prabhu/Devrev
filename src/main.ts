import axios from 'axios';

const botToken = process.env.SLACK_BOT_TOKEN || 'xoxb-8088747461361-8069616515686-kZYdOMmiVwU601IGOlGw06j1';

export async function postToSlack(channel: string, message: string): Promise<string> {
  if (!botToken) {
    throw new Error('Slack Bot Token is missing.');
  }

  try {
    const headers = {
      Authorization: `Bearer ${botToken}`,
      'Content-Type': 'application/json',
    };

    const data = {
      channel: channel,  // Use dynamic channel from argument
      text: message,      // The message to send
    };

    const response = await axios.post('https://slack.com/api/chat.postMessage', data, { headers });

    if (response.data.ok) {
      return 'Message sent to Slack successfully';
    } else {
      throw new Error('Error posting message to Slack: ' + response.data.error);
    }
  } catch (error: any) {
    console.error('Error occurred:', error.message || error);
    throw new Error(`Failed to post to Slack: ${error.message || error}`);
  }
}
