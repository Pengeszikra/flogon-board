import { Devvit } from '@devvit/public-api';

const appName = 'Flogons on the Bridge!';

// Configure Devvit's plugins
Devvit.configure({
  redditAPI: true,
});

// Adds a new menu item to the subreddit allowing to create a new post
Devvit.addMenuItem({
  label: appName,
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: appName,
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">... preparing to launch ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: 'Flogon made a post!' });
    ui.navigateTo(post);
  },
});
