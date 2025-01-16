# Devvit leaderbord implementation

```js
await context.redis.zAdd('leaderboard', { member: `${username}:${datetime}`, score: gameScore });
```

```js
window.parent.postMessage(
  {
    type: 'updateHighScore',
    data: { username: 'player1', score: 1000 },
  },
  '*'
);
```

```js
context.ui.webView.postMessage('myWebView', {
  type: 'updateHighScores',
  data: {
    highScores: [
      { username: 'player1', score: 1000 },
      { username: 'player2', score: 900 },
      // ...
    ],
  },
});
```

```js
const onMessage = async (msg: WebViewMessage) => {
  if (msg?.type === 'updateHighScore') {
    const { username, score } = msg.data;
    await context.redis.zAdd('leaderboard', { member: username, score });
    
    // Fetch updated high scores
    const highScores = await context.redis.zRange('leaderboard', 0, 9, { 
      reverse: true, 
      by: 'score',
      withScores: true 
    });
    
    // Send updated high scores back to web view
    context.ui.webView.postMessage('myWebView', {
      type: 'updateHighScores',
      data: { highScores },
    });
  }
};
```

```js
window.addEventListener('message', (ev) => {
  const { type, data } = ev.data;
  if (type === 'devvit-message') {
    const { message } = data;
    if (message.type === 'updateHighScores') {
      // Update your UI with the new high scores
      updateHighScoresDisplay(message.data.highScores);
    }
  }
});
```