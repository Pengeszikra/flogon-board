# T R A D I N G - P I O N E E R S

Trading Pioneers Online is a chaotic, hilarious social tabletop game where every player is a space trader chasing fame, fortune, or a decent cup of alien tea. Turns? Forget them! Dive into bite-sized mini-games to haggle, smuggle, and gamble your way to glory while everyone else does their thing. Build shady alliances, outwit rivals, or accidentally start intergalactic wars—it’s all in a day’s work. There’s no downtime here—just pure, unhinged cosmic fun!

![](./webroot/i-got-a-ticket.png)

![](./webroot/in-hangar.png)

![](./webroot/wrong-package.png)

![](./webroot/something-behind-us.png)

![](./webroot/bright-and-bad.png)

![](./webroot/play-asteroid.png)

## - webviews

The right solution is webviews!

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