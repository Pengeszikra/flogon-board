## TODO 4 a final `night`
- [x] MIT license
- [-] rework spritesheet to percentage
- [ ] `implement the game` - worst one 
- test the game
- `make image switch animation` when change scroll direction then change the image.
  including treshold and preload.
- [?] make a table where the player can move on
- [x] draw the card animation
- `create content`
- [x] side scroll animation
- connect my program to a `devvit`
- Try to use a database for something.
- redy for commit the release
- create 1 min `pitch` video
- `commit` my project on `devpost`
- make my channel to `public`
- separate editor from the game code
- advertise on social platform

## `:: Rule ::`
For the maximum profit need to be close the RUN score to :: `42`
Under each step draw one card some help some cause problem.
The profit depend on the solved problem score.
Which is need to be a 42. If more you gain more score then it will be fail.

The goal still same, but instead of startegic tabletop game, this is a 
decterity based tabletop game. A flogon jumping on a cards, which is represent the 
table of game, and when second or third time jump a card that card is fly up and
can be collect if you are lucky enough to catch it.
But the final score is depend on when you stop it the game and if you able to stop the 
counter lower up to 42, then you have a extra bonus to your score.

And thats all!

```
// state.deck[17].style.transform = 
// animation out
'translateX(80rem) translateY(22rem) scale(3) rotateX(-50deg) translateZ(-2rem)',
'translateX(80rem) translateY(-22rem) scale(3) rotateX(-50deg) translateZ(-2rem)', 
'translateX(80rem) translateY(-22rem) scale(3) translateZ(-4rem) rotateX(-60deg)',
'translateX(80rem) translateY(-22rem) scale(3) translateZ(20rem) rotateX(-80deg)',
'translateX(80rem) translateY(10rem) scale(3) translateZ(20rem) rotateX(-60deg)',
'translateX(80rem) translateY(10rem) scale(3) translateZ(80rem) rotateX(-60deg)',

```

# Flogons on the Bridge!

Flogons on the Bridge! is a chaotic, hilarious social tabletop game where every player is a space trader chasing fame, fortune, or a decent cup of alien tea. Turns? Forget them! Dive into bite-sized mini-games to haggle, smuggle, and gamble your way to glory while everyone else does their thing. Build shady alliances, outwit rivals, or accidentally start intergalactic wars—it’s all in a day’s work. There’s no downtime here—just pure, unhinged cosmic fun!

## Who is the Flogons?
Flogons is a most succesfull space trader in the galaxy.
Their secret skill give a power to reach even the farest place in the universe.
Our broader knwoledge is included in this game, after every turn you get a piece of information.

## Moments of Flogons 

Deep Space Mining

![](./public/mid/flogon4214.jpeg)

Micro Pirates Raid on docking station

![](./public/mid/flogon4215.jpeg)

Terraform of Ice Moon

![](./public/mid/flogon4216.jpeg)

Harvesting station

![](./public/mid/flogon4217.jpeg)

Two Dose

![](./public/mid/flogon4219.jpeg)

Dream Traveling will starting soon!

![](./public/mid/flogon4220.jpeg)

I saw a this big ....

![](./public/mid/flogon4221.jpeg)

Wellness Pod

![](./public/mid/flogon4222.jpeg)

The right solution is webviews!

## Game Rule

For the maximum profit need to be close the `RUN` score to :: `42`
Under each step draw one card some help some cause problem, 
and the profit depend on the solved problem score.
Which is need to be a 42. If more you are fail. That's all.

- open the app
- make a few stepp on the table
- facing some story element
- finally get a badges, coins, image
- have option to listen a story of Flogon
- mem generation ?
- game animation
- story animation
- need to play with a card?

## Flogon abilities:
- dream travel with quantum symmetry
- shape change
- item morphose
- limited time survive near any environment
- good sense of humor
- don't waste their time to political influence to each other
- don't use digital money

## Card Set

```js
// save
localStorage.setItem('-shoot-', JSON.stringify(shoot));
```

```js
// load
copy(JSON.parse(localStorage.getItem('-shoot-') || '{}'));
```

## - webviews

```js
// simple vite config working well
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'webroot',
    emptyOutDir: true,
  }
});
```

## Content Security Policy on Reddit

```
HTTP header
default-src: 'self'
form-action: 'none'
object-src: 'none'
script-src: 'self', webview.devvit.net, webview-dev.devvit.net, 'wasm-unsafe-eval'
style-src: 'self', webview.devvit.net, webview-dev.devvit.net, 'unsafe-inline'
font-src: 'self', webview.devvit.net, webview-dev.devvit.net, *.redditmedia.com, *.redditstatic.com, fonts.gstatic.com, data:, blob:
frame-ancestors: 'self', *.reddit.com, *.snooguts.net, *.snoo.dev
connect-src: 'self', webview.devvit.net, webview-dev.devvit.net, *.redditmedia.com, *.redditstatic.com, *.redd.it, blob:
img-src: 'self', webview.devvit.net, webview-dev.devvit.net, *.redditmedia.com, *.redditstatic.com, *.redd.it, data:, blob:
media-src: 'self', webview.devvit.net, webview-dev.devvit.net, *.redditmedia.com, *.redditstatic.com, *.redd.it, data:, blob:
worker-src: 'self', webview.devvit.net, webview-dev.devvit.net, data:, blob:
report-to: csp
report-uri: https://w3-reporting-csp.reddit.com/reports
```

## Video Generation

Maybe chineese AI video generation will be worth.
[hailuoai](https://hailuoai.video/create)

WOW! that is very impressive!
[Flogons floating in the space](https://hailuoai.video/create/324701351598858241)
[Direct to the video](https://hailuoai.video/share/dOkz0KpoNb3P)