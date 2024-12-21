import './createPost.js';

import { Devvit } from '@devvit/public-api';

const appName = 'Flogons: Match to 42';

Devvit.addCustomPostType({
  name: appName,
  height: 'tall',
  render: () => (
    <webview
      id="FlogonMatchWebView"
      url="index.html"
      grow
      height={'100%'}
    />
  ),
});

export default Devvit;