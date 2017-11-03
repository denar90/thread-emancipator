# Thread emancipator [![Build Status](https://travis-ci.org/denar90/thread-emancipator.svg?branch=master)](https://travis-ci.org/denar90/thread-emancipator)

> Thread business detector

## Install

```
$ npm install --save thread-emancipator
```

## Usage

```
$ thread-emancipator path-to-script.js
```

or

```js
const threadEmancipator = require('thread-emancipator');

const isThreadBusy = await threadEmancipator('path-to-script.js', 'application-url');
// default application-url is https://www.google.com, if your script is application specific then yous your own url
```

## Motivation

@samccone's [talk](https://www.youtube.com/watch?v=DKyHVGh666s) at Chrome Dev Summit one of the ideas was using [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

![image](https://user-images.githubusercontent.com/6231516/32399812-091fcb82-c102-11e7-8ff0-0a278e41502b.png)

## License

MIT
