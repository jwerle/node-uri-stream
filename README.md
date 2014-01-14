node-uri-stream
===============

Stream contents from a URI. Basically a wrapper for
[node-get-uri](https://github.com/TooTallNate/node-get-uri).

## install

```sh
$ npm install uri-stream
```

## usage

```js
var fetch = require('uri-stream')
  , csso = require('csso')

fetch('file://users/jwerle/foo-site/public/style.css'))
.pipe(through(function (chunk) {
  this.emit('data', csso.justDoIt(String(chunk)));
}))
.pipe(stdout);
```

## support

Basically everything 
[node-get-uri](https://github.com/TooTallNate/node-get-uri) supports.

## license

MIT
