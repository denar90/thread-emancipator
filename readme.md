# Thread emancipator

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


## License

MIT
