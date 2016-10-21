# Kayako Twitter Challenge (Senti)

With Senti you can search any hashtag on twitter which are retweeted at least once and analyze its sentiment (positive, negative or neutral).

  > Default hashtag is #custserv

# Features
- Material UI
- Search for any hashtag.
- Anchored hashtags, mentions, URLs and username.
- Infinte scroll to view previous tweets.
- Sentiment analysis of the tweets fetched [Powered by HPE- Heaven On Demand](http://www.havenondemand.com/).

### Dependencies

Senti uses a number of open source projects to work properly:
- PHP running on a 64 bit machine
- Node(V 5.9.1) and NPM(v3.7.3) to build dependencies.
- [Browserify](http://browserify.org/) - Lets you require('modules') in the browser by bundling up all of your dependencies.
- [Watchify](https://www.npmjs.com/package/watchify) - Watch mode for browserify builds.

### Installation

- Download or clone this repo.
- Move it to your preferred directory.

From your terminal/cmd run, this will load all the dependencies  
```
$ npm install
```
To build bundle.js (Combines all JS into one.)
```
$ npm run build
```
Enable watch mode for browserify builds (Automatically builds, if there is any change in your JS files)
```
$ node run watch
```

### Anchored Tweets

For anchored tweets Change the options in (node_modules/html-tweet/index.js) with
```
 options = extend(
    {
    hashtag: '<a target="_blank" href="https://twitter.com/search?q=%23<%= hashtag %>"><%= hashtag %></a>',
    mention: '<a target="_blank" href="https://twitter.com/search?q=%40<%= mention %>"><%= mention %></a>', 
    url:     '<a target="_blank" href="<%= url %>"><%= url %></a>'
    }, options)
```

### Contact
If you have any doubts/queries please connect with me at [https://www.linkedin.com/in/naman03malhotra](https://www.linkedin.com/in/naman03malhotra)
