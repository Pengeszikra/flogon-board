import './createPost.js';

import { Devvit, useState } from '@devvit/public-api';

const appName = 'Flogons: Match to 42';

type WebViewMessage =
  | { type: 'initialData'; data: { username: string; currentScore: number }; }
  | { type: 'setScore'; data: { newScore: number }; }
  | { type: 'updateScore'; data: { currentScore: number }; };

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: appName,
  height: 'tall',
  render: (context) => {
    const [username] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.username ?? '- unknown - user -';
    });

    const [score, setScore] = useState(async () => {
      const redisCount = await context.redis.get(`score_${context.postId}`);
      return Number(redisCount ?? 0);
    });

    const onMessage = async (msg: WebViewMessage) => {
      switch (msg.type) {
        case 'setScore':
          await context.redis.set(
            `score_${context.postId}`, 
            msg.data.newScore.toString()
          );
          context.ui.webView.postMessage('myWebView', {
            type: 'updateScore',
            data: { currentScore: msg.data.newScore },
          });
          setScore(msg.data.newScore);
          break;
        case 'initialData':
        case 'updateScore':
          break;

        default:
          throw new Error(`Unknown message type: ${msg satisfies never}`);
      }
    }

    return (
      <webview
        id="FlogonMatchWebView"
        url="index.html"
        grow
        height={'100%'}
        onMessage={(msg) => onMessage(msg as WebViewMessage)}
      />
    )
  },
});

export default Devvit;
