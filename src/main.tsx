import './createPost.js';

import { Devvit } from '@devvit/public-api';

const appName = 'Flogons: Match to 42';

Devvit.addCustomPostType({
  name: appName,
  height: 'tall',
  render: () => {
    return (
      <vstack grow padding="small">
        <vstack height={'100%'}>
          <vstack border="thick" borderColor="black" height={'100%'}>
            <webview
              id="FlogonMatchWebView"
              url="index.html"
              grow
              height={'100%'}
            />
          </vstack>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;