# Senti App

Senti helps you analyze what your consumers think about your brand. It searches for given hashtag and analyze its sentiment.

  > Default hashtag is #trump

# Live Demo

  [https://letsconnect.co/senti/] (http://letsconnct-port-letsconnect.193b.starter-ca-central-1.openshiftapps.com/senti/)

# Features
- Material UI.
- Search for any hashtag.
- Search for multiple hashtags separated by space. (ex- custserv good)
- Anchored hashtags, mentions, URLs and username.
- Infinte scroll to view previous tweets.
- Sentiment analysis of the tweets fetched [Powered by HPE- Heaven On Demand](http://www.havenondemand.com/).
- Debugging Mode

### This is just a protoype, the app is still under development, new version will be realesed soon. Stay tuned.

### Dependencies

Senti uses a number of open source projects to work properly:
- PHP running on a 64 bit machine
- Node(V 5.9.1) and NPM(v3.7.3) to build dependencies.
- [Browserify](http://browserify.org/) - Lets you require('modules') in the browser by bundling up all of your dependencies.
- [Watchify](https://www.npmjs.com/package/watchify) - Watch mode for browserify builds.

### Installation

- Download or clone this repo.
- Move it to your root directory.
- Although Bundle.js is given if you need to make some changes in app.js and generate new bundle.js, follow the steps below

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
$ npm run watch
```
- Add your twitter API keys in  ``` app/config/config-twitter.sample.php ``` and rename it to ```config-twitter.php```
- Add your HPE havenOnDemand keys in ``` assets/js/sentiment.sample.js ``` and rename it to ```sentiment.js```



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
- comment or delete  ```hashtag = '#' + hashtag``` and  ```mention = '@' + mention```


### Enable Debugging
- Pass debug=1 as parameter in URL to enable, and see useful error messages
- Pass debug=0 as parameter to disable debugging

#####Example
``` www.example.com?debug=1 ```

### Contact
If you have any doubts/queries please connect with me at [https://letsconnect.co](https://letsconnect.co)
